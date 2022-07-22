const Command = require("../../Base/Command");

class BassBoost extends Command {

    constructor(client) {
        super(client, {
            name: "bassboost",
            aliases: ["bb"],
            guildOnly: true
        });
        this.levels = {
            none: 0.0,
            low: 0.20,
            medium: 0.30,
            high: 0.35,
        };
    }

    async run(message, args) {

        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if(!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));

        if(!args[0]) return message.channel.send(this.t("commands:Music.bassboost.noLevel", {
            levels: Object.keys(this.levels).join(", ")||"none"
        }))

        let level = "none";
        if (args.length && args[0].toLowerCase() in this.levels) level = args[0].toLowerCase();

        const bands = new Array(3)
        .fill(null)
        .map((_, i) =>
          ({ band: i, gain: this.levels[level] })
        );

        serverQueue.setEQ(...bands);

        return message.reply(this.t("commands:Music.bassboost.success", {
            bassLevel: level||"none"
        }));
    }

}

module.exports = BassBoost;