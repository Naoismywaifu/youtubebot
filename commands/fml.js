const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {



        if(args[0] === "normal"){
            client.joker.randomVDM().then((vdm) => {
                let embed = new Discord.MessageEmbed()
                .setDescription("FML")
                .addField("Content", vdm.content, false)
                .setFooter(`Youtube Bot`)
                .setColor("BLUE")
                message.channel.send(embed)
        })

        } else if(args[0] === "hot"){
            client.joker.randomVDM("hot").then((vdm) => {
                let embed = new Discord.MessageEmbed()
                .setDescription("FML Hot")
                .addField("Content", vdm.content, false)
                .setFooter(`FML Hot | Youtube Bot`)
                .setColor("RED")
                message.channel.send(embed)
            })
        } else {
            message.channel.send("Usage: yt*fml <normal/hot>")
        }
    



}

module.exports.help = {
    name: "fml",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "fml",
    aliases: ["vdm"],
    description: "get a fml from the blague.xyz api"
    }