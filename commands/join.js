const Discord = require('discord.js')
const config = require("../config.json")

module.exports = {
    name: 'join',
    description: 'Make YouTube join a channel.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    DJOnly: true,
    enabled: true,
    category: "Music",
    usage: '',
    aliases: [],
    execute(client, message, args) {

        if(client.radiomanager.get(message.guild.id)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


if(!message.member.voice.channel) return message.channel.send(message.language.get("MUSIC_NO_CHANNEL"))
if(client.queue.get(message.guild.id)) return message.channel.send(message.language.get("JOIN_ALREADY_CHANNEL"))

message.member.voice.channel.join().then(connection => {
    message.channel.send(message.language.get("JOIN_SUCCESS", message.member.voice.channel.name))
})


}
}