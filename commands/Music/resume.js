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
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (!serverQueue.paused) return message.channel.send(this.t("commands:Music.resume.notPaused"));
        serverQueue.pause(false);
        message.channel.send(this.t("commands:Music.resume.success"));
    }

}

module.exports = Pause;