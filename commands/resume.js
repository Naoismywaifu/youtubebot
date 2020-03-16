const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")


    if(client.player.getQueue(message.guild.id).playing) return message.channel.send("❌ | the bot is already playing")

message.channel.send("⏯️ | resumed !")
client.player.resume(message.guild.id);


}

module.exports.help = {
    name: "resume",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "resume",
    aliases: [],
    description: "resume to music"
    }