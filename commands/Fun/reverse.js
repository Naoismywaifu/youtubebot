const Command = require("../../Base/Command");

class Reverse extends Command {

    constructor(client) {
        super(client, {
            name: "reverse",
            aliases: [],
        });

    }

    async run(message, args) {
        const m = args.join(" ");
        if (!m) return message.channel.send(this.t("commands:Fun.reverse.noMessage"));

        return message.channel.send(m.split("").reverse().join(""));
    }

}

module.exports = Reverse;