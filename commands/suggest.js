const Discord = require("discord.js")
module.exports = {
        name: 'suggest',
        description: 'Suggest a suggestion for the bot.',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: true,
        args: false,
        enabled: false,
        category: "Core",
        usage: '',
        aliases: ["suggerer"],
        execute(client, message, args) {

    var embed = new Discord.MessageEmbed()
    .setDescription()
    .setFooter("YouTube Bot")
    .setColor("ORANGE")


    message.channel.send(embed)

   }

}