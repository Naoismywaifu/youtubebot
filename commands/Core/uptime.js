const Command = require("../../Base/Command");
const ms = require("ms")

class Uptime extends Command {

    constructor(client) {
        super(client, {
            name: "uptime",
            aliases: [],
        });

    }

    async run(message, args) {

        return message.channel.send(this.t("commands:Core.uptime.uptime", {
            uptime: ms(this.client.uptime||0, { long: true })
        }))

    }

}

module.exports = Uptime;