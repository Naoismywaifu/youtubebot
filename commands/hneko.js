const Discord = require("discord.js");
const fs = require("fs")
const superagent = require('superagent')
const { premium } = require("../premium.js")

module.exports.run = async (client, message, args) => {
const msg = message

if(premium(message.author.id, client)){
    if (msg.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'hneko'})
        .end((err, response) => {
            let emebed = new Discord.MessageEmbed()
            .setDescription(`[Not showing ? click here](${response.body.message})`)
            .setImage(response.body.message)
            .setFooter("Youtube Bot | Premium")
            .setTimestamp()
            .setColor("ORANGE")
            msg.channel.send(emebed);
        });
      } else {
        msg.channel.send(":x: | This channel isn't nsfw !")
      }
} else {

client.dbl.hasVoted(message.author.id).then(voted => {
    if (voted){
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'hneko'})
    .end((err, response) => {
        let emebed = new Discord.MessageEmbed()
        .setDescription(`[Not showing ? click here](${response.body.message})`)
        .setImage(response.body.message)
        .setColor("RED")
        msg.channel.send(emebed);
    });
  } else {
    msg.channel.send(":x: | This channel isn't nsfw !")
  }
    } else {
        let embed = new Discord.MessageEmbed()
        .setDescription(":x: | This command is executable only by permiums users ! \nYou can have access to all nsfw for 12h by voting (yt*vote)")
        message.channel.send(embed)
    }
})
}

}

module.exports.help = {
    name: "hneko",
    group: "NSFW",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "hneko",
    aliases: [],
    description: "NSFW command: only usable when you're premium or you have voted for the bot"
    }