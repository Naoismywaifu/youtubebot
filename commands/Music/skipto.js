const Command = require("../../Base/Command");

class SkipTo extends Command {

    constructor(client) {
        super(client, {
            name: "skipto",
            DJOnly: true,
            guildOnly: true,
            aliases: []
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if(serverQueue.trackRepeat) return message.channel.send(this.t("commands:Music.skipto.loopOn"))
        if (!serverQueue.playing) serverQueue.playing = true;


        if(!args[0]) return message.channel.send(this.t("commands:Music.skipto.noArgs"))

        if(isNaN(args[0]) || args[0] > serverQueue.queue.size || args[0] <= 1)
            return message.channel.send(this.t("commands:Music.skipto.invalidValue"))


        try {
            serverQueue.queue.remove(0, args[0]);
            serverQueue.stop();
        } catch (e) {
            return message.channel.send(this.t("commands:Music.skipto.failed", {
                err: e
            }));
        }
        return message.channel.send(this.t("commands:Music.skipto.success", {
            skipped: args[0]
        }));
    }

}

module.exports = SkipTo;