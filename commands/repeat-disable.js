const Discord = require("discord.js")
const config = require("../config.json")

exports.run = async (client, message, args) => {


    if(!client.player.getQueue(message.guild.id).repeatMode) return message.channel.send("❌ | The repeat mode is already disabled")

        
        client.player.setRepeatMode(message.guild.id, true);

        let song = await client.player.nowPlaying(message.guild.id);
        message.channel.send(`✅ | the loop mode will no longer be activated for the song \`${song.name}\``);





}

module.exports.help = {
    name: "repeat-disable",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "repeat-disable",
    aliases: ["repéter-off", "repeatmode-off", "repeat-off"],
    description: "do not repeat the current music"
    }