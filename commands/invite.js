const  Discord = require("discord.js")

module.exports = {
    name: 'invite',
    description: 'invite the bot on your server.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Core",
    usage: '',
    aliases: ["add"],
    execute(client, message, args) {
let embed = new Discord.MessageEmbed()
.setTitle("Youtube Bot")
.setDescription(message.language.get("INVITE_DESC"))
.addField(message.language.get("INVITE_ALL_PERMS"), `[${message.language.get("INVITE_CLICK_ALL")}](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=2146958847)`, false)
.addField(message.language.get("INVITE_NO_PERMS"), `[${message.language.get("INVITE_CLICK_NONE")}](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=0)`, false)
.setFooter("Youtube Bot")
.setColor("ORANGE")
message.channel.send(embed)
}


        }