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
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if(serverQueue.trackRepeat)
            serverQueue.setTrackRepeat(false)
        else
            serverQueue.setTrackRepeat(true)

        message.channel.send(this.t("commands:Music.loop.loopSucess", {
            status: serverQueue.trackRepeat ? this.t("commands:enabled") : this.t("commands:disabled")
        }));
    }

}

module.exports = Loop;