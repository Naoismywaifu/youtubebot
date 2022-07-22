const Command = require("../../Base/Command");

class NowPlaying extends Command {

    constructor(client) {
        super(client, {
            name: "nowplaying",
            guildOnly: true,
            aliases: ["np", "now", "current", "nowPlaying", "now-playing"],
            description: "See the currently played track"
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (!serverQueue.playing) return message.channel.send(this.t("commands:Music.nowplaying.paused"));
        const currSong = serverQueue.queue.current;
            return message.channel.send(this.t("commands:Music.nowplaying.np", {
            title: currSong.title,
            author: currSong.author,
            requestedBy: currSong.requester.tag
        }));
    }

}

module.exports = NowPlaying;