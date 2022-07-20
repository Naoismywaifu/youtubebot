const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Prefix extends Command {

    constructor(client) {
        super(client, {
            name: "prefix",
            guildOnly: true,
            aliases: [],
        });

    }

    async run(message, args) {

        if(!args[0]) args[0] = "none"

        switch (args[0].toLowerCase()) {
            case "set":

                let prefix = args[1].trim()

                if(!prefix)
                    return message.channel.send(this.t("commands:Config.prefix.noPrefix"));

                if(prefix.length > 3)
                    return message.channel.send(this.t("commands:Config.prefix.invalidPrefix"));

                await this.client.db.guildconf.set(`${message.guild.id}.prefix`, prefix)

                message.channel.send(this.t("commands:Config.prefix.success", {
                    prefix: args[1]
                }));
                break;

            default:

                let embed = new Discord.MessageEmbed()
                    .setDescription(this.t("commands:Config.prefix.currPrefix", {
                        lang: this.client.db.guildconf.get(`${message.guild.id}.language`)||"en-US",
                        allLang: this.client.languages.join(", ")
                    }))
                    .setColor("DARK_RED")

                await message.channel.send({embeds:[embed]})

                break;
        }


    }

}

module.exports = Prefix;