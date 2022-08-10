const { Collection, MessageEmbed } = require("discord.js");
//const { Manager, Rest } = require("@lavacord/discord.js");
const {Manager } = require("erela.js")
const Spotify = require("better-erela.js-spotify").default;
const AppleMusic  = require("erela.js-apple");
const TIDAL  = require("erela.js-tidal");
const Facebook = require("erela.js-facebook");
const Deezer  = require("erela.js-deezer");
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
        try {
            this.manager = new Manager({
                nodes: this.client.config.NODES,
                send(id, payload) {
                    const guild = client.guilds.cache.get(id);
                    if (guild) guild.shard.send(payload);
                  },
                plugins: [
                    new Spotify(),
                    new AppleMusic(),
                    new TIDAL(),
                    new Facebook(),
                    new Deezer()
                ],
                autoPlay: true,
                clientId: this.client.user.id,
                shards: this.client.shard.count
            }).on("nodeConnect", node => {
                this.client.logger.log(`[Node : ${node.options.id}] connected !`, 'ready')            
            }).on("nodeDisconnect", (node, e) => {
                this.client.logger.log(`[Node : ${node.options.id}] disconnected: ${e}`, 'warn')
            }).on("nodeError", (node, err) => {
                this.client.logger.log(`[Node : ${node.options.identifier}] Error: ${err}`, 'error')
            }).on("nodeReconnect", (node) => {
                this.client.logger.log(`[Node : ${node.options.id}] Reconnecting...`, 'warn')
            }).on("nodeError", (node, error) => console.log(`Node ${node.options.id} had an error: ${error.message}`))
                .on("trackStart", (player, track) => {

                    let embed = new MessageEmbed()
                    .setTitle(this.client.t("commands:Music.nowPlaying"))
                    .setURL(track.uri)
                    .setThumbnail(`http://img.youtube.com/vi/${track.identifier||null}/hqdefault.jpg`)
                    .setDescription(this.client.t("commands:Music.Title", { title: track.title||track.identifier, attributes: track.isStream ? this.client.t("commands:Music.Live", {liveicon: "🔴"}) : ""}) + "\n" + this.client.t("commands:Music.Author", { author: track.author||"None", attributes:"" }) + "\n" + this.client.t("commands:Music.Duration", {duration: track.isStream ? this.client.t("commands:Music.Live", {liveicon:"🔴"}) : this.client.functions.millisToDuration(track.duration||0)}) +'\n' + this.client.t("commands:Music.AudioServer", { serverID: player.node.options.id, attributes: player.node.options.id.startsWith("Premium") ? "⭐" : "" }))
                    .setColor("DARK_RED")
                    .setFooter(this.client.t("commands:requestedBy", { user: track.requester.tag }), track.requester.displayAvatarURL({ dynamic: true }))



                  this.client.channels.cache
                    .get(player.textChannel)
                    .send({embeds: [embed]});

                    console.log(track)
                })
                .on("queueEnd", (player) => {
                  this.client.channels.cache
                    .get(player.textChannel)
                    .send(this.t("commands:Music.emptyQueue"));
                  player.destroy();
                });

            this.manager.init(this.client.user.id)
        } catch (e) {
            this.client.logger.log("failed to connect to nodes" + e)
        }        

    }

    async handleVideo(message, voiceChannel, song) {
        if(this.manager.nodes.size == 0) return message.channel.send(message.t("commands:Music.no_audio_nodes_online"));
        //const serverQueue = this.queue.get(message.guild.id);

        let premiumStatus = this.client.functions.isGuildPremium(message.guild.id)

        //console.log("Is premium ? " +premiumStatus)

        let maxQueueLength = premiumStatus ? this.client.config.MUSIC.PREMIUM_MAX_QUEUE_LENGTH : this.client.config.MUSIC.MAX_QUEUE_LENGTH;

        let freshPlayer = false

        // check if player is new
        let fplayer = this.manager.players.get(message.guild.id);
        if(!fplayer)
            freshPlayer = true


        const player = this.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            node: BestNode(this.manager.nodes, premiumStatus),
            selfDeafen: true,
            volume: 100
          });

          player.connect();

            if(Array.isArray(song)){
                let messageImporting = await message.channel.send(message.t("commands:Music.importing_playlist", {
                    songs: song.length
                }));

                if(song.length >= maxQueueLength) return message.channel.send(message.t("commands:Music.reach_queue_limit", {
                    limit: maxQueueLength
                }));

                // song = res.tracks
                await player.queue.add(song)

                await messageImporting.edit(message.t("commands:Music.success_import_playlist", {
                    songs: song.length
                }))

            } else {
            player.queue.add(song);
            if(player.queue.size) {
            message.channel.send(message.t("commands:Music.added_track", {
                title: song.title,
                author: song.author
            }))
            }
            }

            console.log("Is it fresh player ?" + freshPlayer)
            

            try {
                if (!player.playing && !player.paused && freshPlayer) await player.play()
            } catch (error) {
                message.channel.send(message.t("commands:Music.cannot_join_vc", {
                    err: error.message
                }));
                player.destroy(1)
            }
       
    }
}

module.exports = Player;