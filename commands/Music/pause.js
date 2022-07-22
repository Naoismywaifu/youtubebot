const Command = require("../../Base/Command");

class Pause extends Command {

    constructor(client) {
        super(client, {
            name: "pause",
            guildOnly: true,
            guildOnly: true,
            aliases: [],
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (serverQueue.paused) return message.channel.send(this.t("commands:Music.pause.alreadyPaused"));
        serverQueue.pause(true);
        return message.channel.send(this.t("commands:Music.pause.success"));
    }

}

module.exports = Pause;