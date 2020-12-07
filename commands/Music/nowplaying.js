const Command = require("../../Base/Command");

class NowPlaying extends Command {

    constructor(client) {
        super(client, {
            name: "nowplaying",
            aliases: ["np", "now", "current", "nowPlaying", "now-playing"],
            description: "See the currently played track"
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (!serverQueue.playing) return message.channel.send(this.t("commands:Music.nowplaying.paused"));
        const currSong = serverQueue.songs[0];
            return message.channel.send(this.t("commands:Music.nowplaying.np", {
            title: currSong.info.title,
            author: currSong.info.author,
            requestedBy: currSong.requestedBy.tag
        }));
    }

}

module.exports = NowPlaying;