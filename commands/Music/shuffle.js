const Command = require("../../Base/Command");

class Shuffle extends Command {

    constructor(client) {
        super(client, {
            name: "shuffle",
            aliases: [],
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        serverQueue.songs = this.client.functions.shuffleArray(serverQueue.songs)
        return message.channel.send(this.t("commands:Music.shuffle.success"))
    }

}

module.exports = Shuffle;