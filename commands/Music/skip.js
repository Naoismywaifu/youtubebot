const Command = require("../../Base/Command");

class Skip extends Command {

    constructor(client) {
        super(client, {
            name: "skip",
            DJOnly: true,
            guildOnly: true,
            aliases: []
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if(serverQueue.loop) return message.channel.send(this.t("commands:Music.skip.loopOn"))
        if (!serverQueue.playing) serverQueue.playing = true;
        try {
            await serverQueue.stop();
        } catch (e) {
            return message.channel.send(this.t("commands:Music.skip.failed", {
                err: e
            }));
        }
        return message.channel.send(this.t("commands:Music.skip.success"));
    }

}

module.exports = Skip;