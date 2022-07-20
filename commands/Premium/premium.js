const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Premium extends Command {

    constructor(client) {
        super(client, {
            name: "premium",
            guildOnly: true,
            aliases: ["vip"],
        });

    }

    async run(message, args) {


        let embed;
        if (this.client.db.guildconf.get(`${message.guild.id}.premium`)) {
            embed = new Discord.MessageEmbed()
                .setTitle("YouTube Bot Premium 🌟")
                .setDescription(this.t("commands:Premium.premium.yes"))
                .setFooter("YouTube Bot", this.client.user.displayAvatarURL())
                .setColor("GREEN");
        } else {
            embed = new Discord.MessageEmbed()
                .setTitle("YouTube Bot Premium 🌟")
                .setDescription(this.t("commands:Premium.premium.no"))
                .setFooter("YouTube Bot", this.client.user.displayAvatarURL())
                .setColor("RED");

        }
        return message.channel.send({embeds : [embed]})
    }


}

module.exports = Premium;