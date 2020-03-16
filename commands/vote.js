const Discord = require('discord.js');
const botlists = require("../assets/botlists.json")

module.exports.run = async (client, message, args) => {

    /*
   * "name": "BladeBotList",
   * "certified": "true",
   * "rewarded": "false",
   * "website": "https://bladebotlist.xyz",
   * "emoji": "<:bblblue:645339049258909707>",
   * "vote": "https://bladebotlist.xyz/bot/486948160124485642"
    */


let embed = new Discord.MessageEmbed()
.setDescription("Voting will be unblock to you somes perks like NSFW commands without premium required !")
botlists.forEach(p => {
    if(p.certified === "true"){
        var name = `<:certified:686998378810441749> - ${p.emoji} ${p.name}`
    } else {
        var name = `${p.emoji} ${p.name}`
    }

    embed.addField(name, `__Rewarded__ **-** ${p.rewarded}\n[Website](${p.website}) ? [Vote](${p.vote})`, false);

});
embed.setImage("https://top.gg/api/widget/486948160124485642.svg")
message.channel.send(embed)
}

module.exports.help = {
    name: "vote",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "vote",
    aliases: ["voter", "votte"],
    description: "help the bot by voting and get some command in plus !"
    }