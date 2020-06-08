const Discord = require('discord.js')
const config = require("../config.json")

module.exports = {
    name: 'join',
    description: 'Make YouTube join a channel.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Music",
    usage: '',
    aliases: [],
    execute(client, message, args) {

if(!message.member.voice.channel) return message.channel.send(message.language.get("MUSIC_NO_CHANNEL"))
if(client.queue.get(message.guild.id).playing) return message.channel.send("❌ | I'm already in a channel")

message.member.voice.channel.join().then(connection => {
    message.channel.send(`✅  Joined the channel ${message.member.voice.channel.name}`)
})


}
}