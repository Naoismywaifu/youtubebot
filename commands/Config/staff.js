const Command = require("../../Base/Command");
const Discord = require("discord.js")

class DJ extends Command {

    constructor(client) {
        super(client, {
            name: "staff",
            guildOnly: true,
            aliases: ["staffrole"],
        });
    }

    async run(message, args) {

        if(!args[0]) args[0] = "none"

        switch (args[0].toLowerCase()) {
            case "set":

                if(!args[1])
                    return message.channel.send(this.t("commands:Config.staff.invalidValue"));

                let staffRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                if(!staffRole)
                    return message.channel.send(this.t("commands:Config.staff.invalidValue"));

                await this.client.db.guildconf.set(`${message.guild.id}.staffrole`, staffRole.id)

                message.channel.send(this.t("commands:Config.staff.success", {
                    role: staffRole.name
                }));
                break;
            case "reset":

                try {
                    await this.client.db.guildconf.delete(`${message.guild.id}.staffrole`)
                } catch (e) {
                    return message.channel.send(this.t("commands:Config.staff.failedRemoved"));
                }
                message.channel.send(this.t("commands:Config.staff.successRemoved"));
                break;

            default:

                let embed = new Discord.MessageEmbed()
                    .setDescription(this.t("commands:Config.staff.defaultMessage", {
                        role: this.client.db.guildconf.get(`${message.guild.id}.staffrole`) ? message.guild.roles.cache.get(this.client.db.guildconf.get(`${message.guild.id}.staffrole`)).name||"none" : "none"
                    }))
                    .setColor("DARK_RED")

                await message.channel.send({embeds: [embed]})

                break;
        }


    }

}

module.exports = DJ;