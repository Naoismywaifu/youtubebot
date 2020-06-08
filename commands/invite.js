const  Discord = require("discord.js")
exports.run = (client, message, args) => {

let embed = new Discord.MessageEmbed()
.setTitle("Youtube Bot")
.setDescription("YouTube Bot is a Disord bot completly Free with a lot of freatures.")
.addField("Invite with all permissions (recommanded)", "[Invite](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=2146958847)", false)
.addField("Invite without permssions (not recommanded)", "[Invite (not recommanded)](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=0)", false)
.addField("Vote for the bot", "[Vote](https://top.gg/bot/486948160124485642/vote)", false)
.setFooter("Youtube Bot")
.setColor("ORANGE")
message.channel.send(embed)
}


    module.exports.help = {
        name: "invite",
        group: "Core",
        botperms: [],
        usrperm: [],
        owneronly: false,
        usage: "invite",
        aliases: [],
        description: "get a invite to add youtube bot on your server !"
        }