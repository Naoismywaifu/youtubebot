const Discord = require('discord.js')
const config = require("../config.json")
const { premium } = require("../premium")

exports.run = async (client, message, args) => {

    if(message.author.premium) {
        var ppremium = true
    } else {
        var ppremium = false
    }

if(!ppremium){
    var r = ("<:no:653279327323947019> No, So sad :/ [become premium](https://www.patreon.com/botyoutube)")
} else {
        var r = ("<:patreon:653279326690738196> Awesome ! your subscription is valid, thanks for your help !")
}








let embed = new Discord.MessageEmbed()
.setTitle("🌟 Premium Hub ✨")
.addField("Status", r, false)
.setColor("ORANGE")
if(ppremium){
  //  let TTL = (await client.db.get(message.author.id, { raw: true })).ttl;
    embed.addField("<:future:653279331698606081> Time remaining", "in working ;)", false)
} else {
    embed.addField("Youtube bot Premium is the subscription to get more freatures on youtube bot", "[become premium](https://www.patreon.com/botyoutube)", false)
}


message.channel.send(embed)

}



    module.exports.help = {
        name: "premium",
        group: "Premium",
        botperms: [],
        usrperm: [],
        owneronly: false,
        aliases: [],
        description: "Premium or no ? premium activated or no ? everything is here, this is the premium hub !"
        

    
    }