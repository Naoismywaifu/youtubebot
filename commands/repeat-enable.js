const Discord = require("discord.js")
const config = require("../config.json")

exports.run = async (client, message, args) => {


    if(client.player.getQueue(message.guild.id).repeatMode) return message.channel.send("❌ | The repeat mode is already enabled")

        
        client.player.setRepeatMode(message.guild.id, true);

        let song = await client.player.nowPlaying(message.guild.id);
        message.channel.send(`✅ | the loop mode will be activated for the music \`${song.name}\``);





}

module.exports.help = {
    name: "repeat-enable",
    group: "Music",
    botperms: [],
    usrperm: [],
    premiumonly: false,
    owneronly: false,
    usage: "repeat-enable",
    aliases: ["repéter-on", "repeatmode-on", "repeter", "repeat-on"],
    description: "repeat the current music"
    }