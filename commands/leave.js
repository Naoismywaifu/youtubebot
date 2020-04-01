const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(client.radiodb.get(message.guild.id)){
        if(!premium(message.author.id, client)) return message.channel.send("🛑 | leave a radio playing is only for premium users !")
        client.radiodb.delete(message.guild.id)
        let channelid = client.radiodb.get(`${message.guild.id}.channel`)
        client.channels.cache.get(channelid).leave()
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