const Discord = require("discord.js")


exports.run = (client, message, args) => {

    var embed = new Discord.MessageEmbed()
    .setDescription("Suggestions are not supported yet ! due to the spam please join [our support](https://discord.gg/C67wqwZ) and go in the channel <#690636748602212412> ([link](https://discordapp.com/channels/372007536871866368/690636748602212412/690638055484162048)) to suggest your idea")
    .setFooter("YouTube Bot")
    .setColor("ORANGE")


    message.channel.send(embed)

   }

   module.exports.help = {
    name: "suggest",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "suggest <mysugestion>",
    aliases: ["suggestion"],
    description: "Oh you want to help us ? suggest a new idea to make the bot better !"
    }

