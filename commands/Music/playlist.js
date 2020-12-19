const Command = require("../../Base/Command");
const fetch = require("node-fetch");

class Search extends Command {

    constructor(client) {
        super(client, {
            name: "playlist",
            guildOnly: true,
            DJOnly: true,
            aliases: ["pl"],
        });
    }

    async run(message, args) {
        if (!args.length)
            return message.channel.send(this.t("commands:Music.playlist.noArgs"))

        let m = await message.channel.send(this.t("commands:Music.playlist.searching"))

        try {
            let url = await this.getPlaylist(args.join(" "))

            if(!url) return message.channel.send(this.t("commands:Music.playlist.failed", {
                "e": "i didn't found any playlist which match with your query!"
            }))
            m.delete()
            return this.client.getCommand("play").run(message, [`${url}`])
        }catch (e) {
            m.delete()
            return message.channel.send(this.t("commands:Music.playlist.failed", {
                "e":e.message
            }))
        }


    }
    async getPlaylist(query) {
        let url;
        await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=playlist&key=${this.client.config.YTAPIKEY}`, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            if(!res.items[0]) throw new Error("No found any playlist with this query!")
            let id = res.items[0].id.playlistId
            if(!id) throw new Error("No found any playlist with this query!")
            console.log(id)
            url = `https://www.youtube.com/playlist?list=${id}`
        });

        return url;
    }



}

module.exports = Search;