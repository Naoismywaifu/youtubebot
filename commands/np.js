const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")

    let song = await client.player.nowPlaying(message.guild.id);
    let embed = new Discord.MessageEmbed()
    .setDescription(`<:youtube:684748153282625538> | i'm currently playing \`${song.name}\` by \`${song.author}\``)
    .setThumbnail(song.thumbnail)
    .setColor("RED")
    message.channel.send(embed);


}

module.exports.help = {
    name: "np",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "np",
    aliases: ["nowplaying", "now-playing", "playing"],
    description: "know what is the music who is played"
    }