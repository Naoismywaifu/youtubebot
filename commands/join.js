const Discord = require('discord.js')
const config = require("../config.json")
const { EIL } = require("../EIL.js")


exports.run = async (client, message, args) => {

if(!message.member.voice.channel) return message.channel.send("❌ | First of all you must join a channel")
if(client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | I'm already in a channel")
if(client.radiodb.get(message.guild.id)) return message.channel.send("❌ | I'm already in a channel")

message.member.voice.channel.join().then(connection => {
    message.channel.send(`✅  Joined the channel ${message.member.voice.channel.name}`)
})


}

module.exports.help = {
    name: "join",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "join",
    aliases: ["join-channel"],
    description: "join the channel where you are"
    }

  