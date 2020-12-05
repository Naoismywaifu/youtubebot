const { Collection, MessageEmbed } = require("discord.js");
const { Manager, Rest } = require("@lavacord/discord.js");
const fetch = require("node-fetch")
const { BestNode } = require("../Util/NodeSelector")
const Queue = require("./Queue");
const ms = require("ms")

/**
 * @class Player
 */
class Player {
    /**
     * @param {import("./YouTubeBot")} client
     */
    constructor(client) {
        this.client = client;
        this.startedNodes = [];
        this.manager = new Manager(client, client.config.NODES,  {
            user: client.user.id,
            shards: client.shard ? client.shard.count : 1
        });

        this.manager.connect();
        
        this.queue = new Collection();

        this.manager.on("ready", node => {
            this.client.logger.log(`[Node : ${node.id}] connected !`, 'ready')
            let isPremiumNode = node.id.startsWith("Premium")
            this.startedNodes.push({ "id":node.id, "host":node.host, "port":node.port, "premium": isPremiumNode, "password":node.password, "stats":node.stats })
            
        }).on("disconnect", (wsevent, node) => {
            this.startedNodes = this.startedNodes.filter(n => node.id !== n.id)
            this.client.logger.log(`[Node : ${node.id}] disconnected: ${wsevent}`, 'warn')
        }).on("error", (err, node) => {
            this.client.logger.log(`[Node : ${node.id}] Error: ${err}`, 'error')
        }).on("reconnecting", (node) => {
            this.client.logger.log(`[Node : ${node.id}] Reconnecting...`, 'warn')
        })


    }

    async handleVideo(message, voiceChannel, song) {
        if(!this.startedNodes.length) return message.channel.send(message.t("commands:Music.no_audio_nodes_online"))
        const serverQueue = this.queue.get(message.guild.id);

        if (!serverQueue) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel,
                node: BestNode(this.queue, this.startedNodes, true).id
            });
            if(Array.isArray(song)){
                let mimporting = await message.channel.send(message.t("commands:Music.importing_playlist", {
                    songs: song.length
                }))
                for (let i = 0; i < song.length; i++) {
                    const s = song[i];
                    s.requestedBy = message.author
                    queue.songs.push(s)
                }
                await mimporting.edit(message.t("commands:Music.success_import_playlist", {
                    songs: song.length
                }))
            } else {
            song.requestedBy = message.author
            queue.songs.push(song);
            }
            this.queue.set(message.guild.id, queue);

            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: await queue.getNode()
                }, {
                    selfdeaf: true
                });
                queue.setPlayer(player);
                this.play(message.guild, Array.isArray(song) ? song[0] : song);
            } catch (error) {
                message.channel.send(message.t("commands:Music.cannot_join_vc", {
                    err: error.message
                }));
                this.queue.delete(message.guild.id);
                await this.manager.leave(message.guild.id);
            }
        } else {
            if(Array.isArray(song)){
                message.channel.send(message.t("commands:Music.importing_playlist", {
                    songs: song.length
                }))

                if(song.length + serverQueue.songs.length >= 200) return message.channel.send(message.t("commands:Music.reach_queue_limit", {
                    limit: 200
                }))

                for (let i = 0; i < song.length; i++) {
                    const s = song[i];
                    s.requestedBy = message.author
                    serverQueue.songs.push(s)
                }
            } else {
                if(serverQueue.songs.length + 1 >= 200) return message.channel.send(message.t("commands:Music.reach_queue_limit", {
                    limit: 200,
                }))
            song.requestedBy = message.author
            serverQueue.songs.push(song);
            }

            //message.channel.send(`Added ${Array.isArray(song) ? `**${song.length}** videos to the queue` : `**${song.info.title||"none"}** by **${song.info.author||"none"}**`}`)
            message.channel.send(Array.isArray(song) ? message.t("commands:Music.added_queue", {
                length: song.length
            }) : message.t("commands:Music.added_track", {
                title: song.info.title,
                author: song.info.author
            }))

        }
    }

    play(guild, song) {
        const serverQueue = this.queue.get(guild.id);
        if (!song) {
            serverQueue.textChannel.send(guild.t("commands:Music.empty_queue"));
            this.manager.leave(guild.id);
            this.queue.delete(guild.id);
        } else {
            serverQueue.player.play(song.track);
            serverQueue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;
                    if (!serverQueue.loop) {
                        let queue = serverQueue.songs
                        queue.shift();
                        serverQueue.songs = queue;
                    }
                    this.play(guild, serverQueue.songs[0]);
                });
                let embed = new MessageEmbed()
                .setTitle(guild.t("commands:Music.nowPlaying"))
                .setURL(song.info.uri)
                .setThumbnail(`http://img.youtube.com/vi/${song.info.identifier||null}/hqdefault.jpg`)
                .setDescription(guild.t("commands:Music.Title", { title: song.info.title||song.info.identifier, attributes: song.info.isStream ? guild.t("commands:Music.Live", {liveicon: "🔴"}) : ""}) + "\n" + guild.t("commands:Music.Author", { author: song.info.author||"None", attributes:"" }) + "\n" + guild.t("commands:Music.Duration", {duration: song.info.isStream ? guild.t("commands:Music.Live", {liveicon:"🔴"}) : ms(song.info.length||0, { long:true })}) +'\n' + guild.t("commands:Music.AudioServer", { serverID: serverQueue.node, attributes: serverQueue.node.startsWith("Premium") ? "⭐" : "" }))
                .setColor("DARK_RED")
                .setFooter(guild.t("commands:requestedBy", { user: song.requestedBy.tag }), song.requestedBy.displayAvatarURL({ dynamic: true }))

            serverQueue.player.volume(serverQueue.volume);
            serverQueue.textChannel.send(embed);
        }
    }

    async getSongs(query) {
        const node = BestNode(this.queue, this.startedNodes, true);
        this.client.logger.log(`selected ${node.id} as node.`, "debug")
      // let res = Rest.load(this.manager.nodes.get(`${node.id}`), `ytsearch: ${query}`) don't support urls

        const params = new URLSearchParams();
        const isHttp = /^https?:\/\//.test(query);
        query = isHttp ? query : `ytsearch: ${query}`;
        params.append('identifier', query);


        return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, {
            headers: {
                Authorization: node.password
            }
        }).then(res => res.json())
            .catch(err => {
                console.error(err)
                return null
            });

    }
}

module.exports = Player;