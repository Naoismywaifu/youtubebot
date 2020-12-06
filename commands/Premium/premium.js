const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Premium extends Command {

    constructor(client) {
        super(client, {
            name: "premium",
            aliases: ["vip"],
        });

    }

    async run(message, args) {


        let embed;
        if (this.client.db.guildconf.get(`${message.guild.id}.premium`)) {
            embed = new Discord.MessageEmbed()
                .setTitle("YouTube Bot Premium 🌟")
                .setDescription("yes")
                .setFooter("YouTube Bot")
                .setColor("GREEN");
        } else {

            embed = new Discord.MessageEmbed()
                .setTitle("YouTube Bot Premium 🌟")
                .setDescription("no !")
                .setFooter("YouTube Bot")
                .setColor("RED");

        }
        return message.channel.send(embed)
    }


}

module.exports = Premium;