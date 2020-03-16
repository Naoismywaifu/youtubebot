const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {


if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")


let queue = await client.player.getQueue(message.guild.id);
// [ #1 ] | JUL - WESH ALORS // CLIP OFFICIEL //2015 | DORETDEPLATINE

let i = 0;

let embed = new Discord.MessageEmbed()
.setDescription(`Server queue:\n${queue.songs.map((song, i) => {
    return `${i === 0 ? '[ **Current** ]' : `[ **#${i+1}** ]`} \`${song.name}\` | \`${song.author}\``
}).join('\n')}`)
.setColor("DARK_RED")
.setFooter("YouTube Bot")
.setTimestamp()

message.channel.send(embed)

}

module.exports.help = {
    name: "queue",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "queue",
    aliases: ["musics", "after", "soon"],
    description: "get the queue of this server"
    }