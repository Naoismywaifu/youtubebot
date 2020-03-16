const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")

message.channel.send("⏭️ | Skipped !")
    client.player.skip(message.guild.id)


}

module.exports.help = {
    name: "skip",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "skip",
    aliases: ["sauter", "prochaine"],
    description: "skip the current music"
    }