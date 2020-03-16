const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")

message.channel.send("<:no:653279327323947019> | stopped !")
    client.player.stop(message.guild.id);


}

module.exports.help = {
    name: "leave",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "leave",
    aliases: ["l"],
    description: "use this command to leave the bot"
    }