const Discord = require('discord.js')
const config = require("../config.json")
const { premium } = require("../premium")

exports.run = (client, message, args) => {

    if(premium(message.author.id, client)) {
        var ppremium = true
    } else {
        var ppremium = false
    }
    //let prole = (message.member.roles.cache.get("565938460737929226"))

if(!ppremium){
    var r = ("<:no:653279327323947019> No, So sad :/ [become premium](https://www.patreon.com/botyoutube)")
} else {
        var r = ("<:patreon:653279326690738196> Awesome ! your subscription is valid, thanks for you help !")
}






let embed = new Discord.MessageEmbed()
.setTitle("🌟 Premium Hub ✨")
.addField("Status", r, false)
.addField("Youtube bot Premium is the subscription to get more freatures on youtube bot", "[become premium](https://www.patreon.com/botyoutube)", false)
.setColor("ORANGE")

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