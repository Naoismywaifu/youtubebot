const Command = require("../../Base/Command");

class Loop extends Command {

    constructor(client) {
        super(client, {
            name: "loop",
            DJOnly: true,
            guildOnly: true,
            aliases: ["repeat"]
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        serverQueue.loop = !serverQueue.loop;
        message.channel.send(this.t("commands:Music.loop.loopSucess", {
            status: serverQueue.loop ? this.t("commands:enabled") : this.t("commands:disabled")
        }));
    }

}

module.exports = Loop;