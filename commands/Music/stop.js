const Command = require("../../Base/Command");

class Stop extends Command {

    constructor(client) {
        super(client, {
            name: "stop",
            DJOnly: true,
            guildOnly: true,
            aliases: ["leave", "dc", "end", "disconnect", "l", "clear"]
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        try {
            serverQueue.destroy();
        } catch (e) {
            return message.channel.send(this.t("commands:Music.stop.failed", {
                err: e
            }));
        }
        return message.channel.send(this.t("commands:Music.stop.success"));
    }

}

module.exports = Stop;