const Discord = require('discord.js')
const opusscript = require("node-opus")
const config = require("../config.json")
const { Util } = require("discord.js")
//const moment = require("moment"), 
const convertMS = require("ms-convert")
const { EIL } = require("../EIL.js")
const { premium } = require("../premium")

exports.run = async (client, message, args) => {

  let m = args.join(" ")
/*
if(!message.member.roles.cache.some(role => role.name === 'DJ')){
if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: false, checkOwner: false })) {
	return message.channel.send("🛑 | this command is only for users with the permission 'MANAGE_MESSAGES' or users with a role named 'DJ' (case sensitive)")
}
}
*/

if(client.radiodb.get(message.guild.id)) return message.channel.send("❌ | I'm already playing radio in a chnnel please use yt*leave to make me leave them")

if(client.player.getQueue(message.guild.id)){
    if(client.player.getQueue(message.guild.id).length >= 30 && !premium(message.author.id, client)) return message.channel.send("🛑 | Error: you can't add more than 30 music, please subscribe to the premium to increase this limit")
    if(premium(message.author.id, client)){
      if(client.player.getQueue(message.guild.id).length >= 100) return message.channel.send("🛑 | Oops you just reached the queue limit !")
    }
  }

    if(!m) return message.channel.send("❌ | Error: please add a music name !")



    if(!message.member.voice.channel) return message.channel.send("❌ | Error: You're not in a voice channel !")
   // EIL("play", message.guild, message.author, client, `playing music: ${m}`)
  



    if(client.player.isPlaying(message.guild.id)){


 if (message.member.voice.channel.id !== client.player.getQueue(message.guild.id).connection.channel.id) {
        return message.channel.send("🛑 | You must be in the same channel as the bot !");
      }

    let song = await client.player.addToQueue(message.guild.id, m);

    if(song.rawVideo.duration.hours >= 10){
      var hours = song.rawVideo.duration.hours
    } else {
      var hours = (`0${song.rawVideo.duration.hours}`)
    }
  
    if(song.rawVideo.duration.minutes >= 10){
      var minutes = song.rawVideo.duration.minutes
    } else {
      var minutes = (`0${song.rawVideo.duration.minutes}`)
    }
  
  
    if(song.rawVideo.duration.seconds >= 10){
      var seconds = song.rawVideo.duration.seconds
    } else {
      var seconds = (`0${song.rawVideo.duration.seconds}`)
    }


 var embedok = new Discord.MessageEmbed()
.setTitle("**<a:disk:678236590493138954> Added to Queue <a:disk:678236590493138954>**")
.setDescription(` » \`${song.name}\`\n » Author: \`${song.author}\`\n\`\`\`▶ 🔘──────────────────────────── ${hours}:${minutes}:${seconds}\`\`\``)
.setThumbnail(song.thumbnail)
.setURL(song.url)
.setFooter(`requested by ${message.author.tag}`, message.author.avatarURL)
.setTimestamp()
message.channel.send(embedok)
} else {
let song = await client.player.play(message.member.voice.channel, m)

if(song.rawVideo.duration.hours >= 10){
  var hours = song.rawVideo.duration.hours
} else {
  var hours = (`0${song.rawVideo.duration.hours}`)
}

if(song.rawVideo.duration.minutes >= 10){
  var minutes = song.rawVideo.duration.minutes
} else {
  var minutes = (`0${song.rawVideo.duration.minutes}`)
}


if(song.rawVideo.duration.seconds >= 10){
  var seconds = song.rawVideo.duration.seconds
} else {
  var seconds = (`0${song.rawVideo.duration.seconds}`)
}

var embedok1 = new Discord.MessageEmbed()
.setTitle("**<a:disk:678236590493138954> Now playing <a:disk:678236590493138954>**")
.setDescription(` » \`${song.name}\`\n » Author: \`${song.author}\`\n\`\`\`▶ 🔘──────────────────────────── ${hours}:${minutes}:${seconds}\`\`\``)
.setThumbnail(song.thumbnail)
.setURL(song.url)
.setFooter(`requested by ${message.author.tag}`, message.author.avatarURL)
.setTimestamp()
message.channel.send(embedok1)

}

client.player.getQueue(message.guild.id)
.on('end', () => {
  var embedok1 = new Discord.MessageEmbed()
  .setTitle("**<:ytbot_stop:693854856057847820> Playback Finished <:ytbot_stop:693854856057847820>**")
  .setDescription(`Title » \`${song.name}\`\nChannel » \`${song.author}\`\n\`\`\`⏹ ────────────────────────────🔘 ${hours}:${minutes}:${seconds}\`\`\``)
  .setThumbnail(song.thumbnail)
  .setURL(song.url)
  .setFooter(`requested by ${message.author.tag}`, message.author.avatarURL)
  .setTimestamp()
  message.channel.send(embedok1)
})
.on('songChanged', (oldSong, newSong, skipped) => {
  if(!skipped){
    message.channel.send(`Now playing ${newSong.name}...`);
  }
  })

  

}

module.exports.help = {
    name: "play",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "play (my music)",
    aliases: ["playmusic", "p", "jouer"],
    description: "🎧🎶 doubadou badou... hmmm... listen music from youtube"
    }

  