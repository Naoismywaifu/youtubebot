const Command = require("../../Base/Command");

class Pause extends Command {

    constructor(client) {
        super(client, {
            name: "resume",
            DJOnly: true,
            guildOnly: true,
            aliases: [],
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (serverQueue.playing) return message.channel.send(this.t("commands:Music.resume.notPaused"));
        serverQueue.resume();
        message.channel.send(this.t("commands:Music.resume.success"));
    }

}

module.exports = Pause;