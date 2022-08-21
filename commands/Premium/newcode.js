const Command = require("../../Base/Command");
const Discord = require("discord.js")

class NewCode extends Command {

    constructor(client) {
        super(client, {
            name: "newcode",
            guildOnly: false,
            aliases: [],
        });

    }

    async run(message, args) {

        if(message.channel.type !== "DM") return message.channel.send(this.t("commands:Premium.newcode.notInDMs"))

        if(this.client.db.users.get(`${message.author.id}.premiums`) <= 0) return message.channel.send(this.t("commands:Premium.newcode.noPremium"))

        message.author.send(this.t("commands:Premium.newcode.generating"))

        this.client.db.users.subtract(`${message.author.id}.premiums`, 1)

        let code = `${await this.generate(5)}-${await this.generate(5)}-${await this.generate(5)}-${await this.generate(5)}`

        await message.author.send(this.t("commands:Premium.newcode.success", {
            code: code
        }))

        this.client.db.codes.set(code, { "author":message.author.id, "date":Date.now() })

    }

    async generate(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


}

module.exports = NewCode;