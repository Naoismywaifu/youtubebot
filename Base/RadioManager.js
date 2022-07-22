const { BestNode } = require("../Util/NodeSelector")
const {Collection} = require("discord.js")

class RadioManager {
    constructor(client) {

        this.client = client;
        this.queue = new Collection();
        this.startedNodes = client.player.startedNodes;
        this.player = client.player;

        setTimeout(() => {
            this.start();
        }, 1 * 5 * 1000)
    }

    async play(ch, url, guildID) {

        let song = await this.player.manager.search(url, guildID)
        try {
            this.client.logger.log(`Will play in channel ${ch}, song ${song.tracks[0].info ? song.tracks[0].info.title || "none" : "none"} by ${song.tracks[0].info ? song.tracks[0].info.author || "none" : "none"}.`, "debug")
        } catch (e) {}

 
        let player = await this.player.manager.create({
            voiceChannel: ch,
            guild: guildID,
            node: await BestNode(this.client.player.manager.nodes, true)
        }, {
            selfdeaf: true
        })

        console.log(song)

        if(song.loadType == "NO_MATCHES") {
            await this.client.db.radiomanager.delete(guildID)
            return this.client.logger.log(`No matches for ${url}, canceling player`, "error")
        } else if (song.loadType == 'LOAD_FAILED') {
            await this.client.db.radiomanager.delete(guildID)
            return this.client.logger.log(`No invalid format ${url}, canceling player`, "error")    
        }

        await player.queue.add(song.tracks[0])
        await player.play()
        this.client.radioManager.queue.set(message.guild.id, true)


        player.on("error", (err) => {
                if (err.code == 4014) {
                    player.manager.leave(guildID)
                    this.queue.delete(guildID)
                    return this.play(ch, url, guildID)
                }
            })

        this.queue.set(guildID, {
            "player": player,
            "channel": ch,
            "node": player.node.id
        })


    }

    async start() {
        let pumpitup = await this.client.db.radiomanager.all()
        for (let i = 0; i < pumpitup.length; i++) {
            let r = await this.client.db.radiomanager.get(pumpitup[i].ID)
            if (!this.client.channels.cache.has(r.voicechannel)) continue;
            await this.play(r.voicechannel, r.url, r.guild);
        }
    }

    async setVolume(guildID, value) {
        if (!value || isNaN(value)) return false;
        await this.queue.get(guildID).player.volume(value)
        await this.client.db.radiomanager.set(`${guildID}.volume`, value)
        return true;
    }

    async destroy(guildID) {
        await this.queue.delete(guildID);
        await this.client.db.radiomanager.delete(guildID)
        await this.player.manager.leave(guildID);
        return true;
    }

}
module.exports = RadioManager;