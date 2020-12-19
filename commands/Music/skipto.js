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
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if(serverQueue.loop) return message.channel.send(this.t("commands:Music.skipto.loopOn"))
        if (!serverQueue.playing) serverQueue.playing = true;


        if(!args[0]) return message.channel.send(this.t("commands:Music.skipto.noArgs"))

        if(isNaN(args[0]) || args[0] > serverQueue.songs.size || args[0] <= 1)
            return message.channel.send(this.t("commands:Music.skipto.invalidValue"))


        try {
            serverQueue.songs = serverQueue.songs.slice(args[0] - 2);
            await serverQueue.skip();
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