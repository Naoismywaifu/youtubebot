const Discord = require('discord.js')
const opusscript = require("node-opus")
const config = require("../config.json")
const { premium } = require("../premium")
const radios = require("../assets/radios.json")


exports.run = async (client, message, args) => {

if(!premium(message.author.id, client)) return message.channel.send("🛑 | Premium-only command !")

if(client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | i am already playing music in this server !")

if(!message.member.voice.channel) return message.channel.send("❌ | Please join the channel where you want that i play !")

let rid = args[0]




if(!radios[rid]) return message.channel.send("❌ | Hmmm this radio don't exist !")
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play(radios[rid].url, {
            volume: 1,
          })
          client.radiodb.set(`${message.guild.id}`, { url: radios[rid].url, guild: message.guild.id, channel: message.member.voice.channel.id })
        message.channel.send(`✅ | i'm playing the radio ${rid} (and forever yay !)`)
      } else {
        message.reply('You need to join a voice channel first !');
      }
    







};





module.exports.help = {
    name: "play-radio",
    group: "Premium",
    botperms: [],
    usrperm: [],
    owneronly: false,
    premiumonly: true,
    usage: "play-radio <radio id>",
    aliases: ["radio-play", "p-radio", "playradio", "radioplay"],
    description: "listen 24/7 a radio from the list in yt*radios"
    }

  