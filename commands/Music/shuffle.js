const Command = require("../../Base/Command");

class Shuffle extends Command {

    constructor(client) {
        super(client, {
            name: "shuffle",
            aliases: [],
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        serverQueue.queue.shuffle()
        return message.channel.send(this.t("commands:Music.shuffle.success"))
    }

}

module.exports = Shuffle;