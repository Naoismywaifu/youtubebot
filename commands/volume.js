const Discord = require('discord.js');
const { premium } = require('../premium.js')
const { maxfreevol } = require("../config.json")
module.exports.run = async (client, message, args) => {




if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")



let queue = await client.player.getQueue(message.guild.id);
let curvol = queue.volume

if(!args[0]){
let curvoll = new Discord.MessageEmbed()
.setDescription("Current volume: " + curvol + "%")
.setColor("DARK_RED")
message.channel.send(curvoll)
} else {
if(isNaN(parseInt(args[0]))) return message.channel.send("🛑 | The specified volume isn't valid !")
if(parseInt(args[0]) > maxfreevol && !premium(message.author.id, client)) return message.channel.send("🛑 | Oops you can't set the volume upper than "+ maxfreevol +"%, you must subscribe to youtube bot premium to get this freature")
if(parseInt(args[0]) > 200) return message.channel.send("🛑 | Oops volume limit reached !")
if(parseInt(args[0]) < 0) return message.channel.send("🛑 | Invalid entry")
client.player.setVolume(message.guild.id, parseInt(args[0]));
let setvoll = new Discord.MessageEmbed()
.setDescription(`Volume set to ${args[0]}% !`)
.setColor("DARK_RED")
message.channel.send(setvoll)
}

}

module.exports.help = {
    name: "volume",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "volume 100",
    aliases: [],
    description: "set the volume of the music"
    }