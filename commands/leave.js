const Discord = require('discord.js');
const { premium } = require("../premium")
module.exports.run = async (client, message, args) => {
    if(client.radiodb.get(message.guild.id)){
        if(!message.member.voice.channel) return message.channel.send("❌ | First of all you must join the channel")
        if(!premium(message.author.id, client)) return message.channel.send("🛑 | leave a radio playing is only for premium users !")
        let channelid = client.radiodb.get(`${message.guild.id}.channel`)
        if(message.member.voice.channel.id !== channelid) return message.channel.send("❌ | please join the correct channel")
        let channel = client.channels.cache.get(channelid)
        message.member.voice.channel.leave()
        client.radiodb.delete(message.guild.id)
        message.channel.send("✅ | right i have stopped to play radio in this channel")
    } else {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")

message.channel.send("<:no:653279327323947019> | stopped !")
    client.player.stop(message.guild.id);

    }
}

module.exports.help = {
    name: "leave",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    premiumonly: false,
    usage: "leave",
    aliases: ["l", "stop", "end"],
    description: "use this command to make leave the bot from a channel"
    }