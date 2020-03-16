const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")
    if(!client.player.getQueue(message.guild.id).playing) return message.channel.send("❌ | the bot is already paused or stopped")

message.channel.send("⏸️ | paused !")
client.player.pause(message.guild.id);


}

module.exports.help = {
    name: "pause",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "pause",
    aliases: [],
    description: "Pause the current music"
    }