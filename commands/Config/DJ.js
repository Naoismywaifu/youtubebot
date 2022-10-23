const Command = require("../../Base/Command");
const Discord = require("discord.js")

class DJ extends Command {

    constructor(client) {
        super(client, {
            name: "DJ",
            guildOnly: true,
            aliases: ["dj", "djrole"],
        });
    }

    async run(message, args) {

        return message.channel.send("Music commands are disabled!")


        if(!args[0]) args[0] = "none"

        switch (args[0].toLowerCase()) {
            case "set":

                if(!args[1])
                    return message.channel.send(this.t("commands:Config.DJ.invalidValue"));

                let djrole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                    if(!djrole)
                        return message.channel.send(this.t("commands:Config.DJ.invalidValue"));
                    
                await this.client.db.guildconf.set(`${message.guild.id}.djrole`, djrole.id)

                message.channel.send(this.t("commands:Config.DJ.success", {
                    role: djrole.name
                }));
                break;
            case "reset":

                try {
                    await this.client.db.guildconf.delete(`${message.guild.id}.djrole`)
                } catch (e) {
                    return message.channel.send(this.t("commands:Config.DJ.failedRemoved"))
                }
                message.channel.send(this.t("commands:Config.DJ.successRemoved"));
                break;

            default:

                let embed = new Discord.MessageEmbed()
                    .setDescription(this.t("commands:Config.DJ.defaultMessage", {
                        role: this.client.db.guildconf.get(`${message.guild.id}.djrole`) ? message.guild.roles.cache.get(this.client.db.guildconf.get(`${message.guild.id}.djrole`)).name||"none" : "none"
                    }))
                    .setColor("DARK_RED")

                await message.channel.send({embeds: [embed]})

                break;
        }


    }

}

module.exports = DJ;