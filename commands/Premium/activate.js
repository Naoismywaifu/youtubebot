const Command = require("../../Base/Command");

class Activate extends Command {

    constructor(client) {
        super(client, {
            name: "activate",
            guildOnly: true,
            aliases: [],
        });

    }

    async run(message, args) {


        if(this.client.db.guildconf.get(`${message.guild.id}.premium`)) return message.channel.send(this.t("commands:Premium.activate.already"))

        let premnb = this.client.db.users.get(`${message.author.id}.premiums`)||0

        if(!premnb || premnb <= 0) return message.channel.send(this.t("commands:Premium.activate.noPremium"))

        this.client.db.users.subtract(`${message.author.id}.premiums`, 1)

        this.client.db.guildconf.set(`${message.guild.id}.premium`, true)

        return message.channel.send(this.t("commands:Premium.activate.success"))


    }


}

module.exports = Activate;