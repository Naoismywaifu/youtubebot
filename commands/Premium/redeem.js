const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Redeem extends Command {

    constructor(client) {
        super(client, {
            name: "redeem",
            guildOnly: false,
            aliases: ["code"],
        });

    }

    async run(message, args) {


        if(!this.client.db.codes.get(args[0])) return message.channel.send(this.t("commands:Premium.redeem.noExist"))

        this.client.db.users.add(`${message.author.id}.premiums`, 1)

        this.client.db.codes.delete(args[0])

        message.channel.send(this.t("commands:Premium.redeem.success"))


    }


}

module.exports = Redeem;