const Command = require("../../Base/Command");

class Seek extends Command {

    constructor(client) {
        super(client, {
            name: "seek",
            DJOnly: true,
            guildOnly: true,
            aliases: []
        });
        this.durationPattern = /^[0-5]?[0-9](:[0-5][0-9]){1,2}$/;
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (!args[0]) return message.channel.send(this.t("commands:Music.seek.noTimeGiven"))

        let duration = args[0]

        if (!serverQueue.songs[0].info.isSeekable)
            return message.channel.send(this.t("commands:Music.seek.cannotSeek"));


        if (!this.durationPattern.test(duration))
            return message.channel.send(this.t("commands:Music.seek.invalidDuration"));

        let durationMs = this.client.functions.durationToMillis(duration);
        if (durationMs > serverQueue.songs[0].info.length)
            return message.channel.send(this.t("commands:Music.seek.durationTooLong"));

        try {
            await serverQueue.player.seek(durationMs);
            message.channel.send(this.t("commands:Music.seek.success", {
                marker: this.client.functions.millisToDuration(durationMs)
            }));
        } catch (e) {
            return message.channel.send(this.t("commands:Music.seek.unknownError", {
                err: e.message
            }));
        }

    }

}

module.exports = Seek;