const Discord = require("discord.js")
const config = require("../config.json")

exports.run = (client, message, args) => {

    message.channel.send("<a:loading:653279329022640128> checking your status...").then((m) => {

    if(config.staffsbot.includes(message.author.id)){
        var embed = new Discord.MessageEmbed()
        .setDescription("CHECK STAFF")
        .addField("<a:Verified:677182501206097944>" + message.author.tag, "this person is a Youtube Bot STAFF")
        .setAuthor("the youtube bot's staff will be never ask your discord login and password, if someone say be staff please say it to execute this command", message.author.displayAvatarURL)
        .setColor("GREEN")
        m.edit(embed)

    } else {
        var embed = new Discord.MessageEmbed()
        .setDescription("CHECK STAFF")
        .addField("❌" + message.author.tag, "this person isn't a Youtube Bot STAFF")
        .setAuthor("if this person say be youtube bot staff please contact us immedialtely !!", message.author.displayAvatarURL)
        .setColor("RED")
        m.edit(embed)
    }
    })
   }

   module.exports.help = {
    name: "checkstaff",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "checkstaff",
    aliases: ["cs"],
    description: "if someone say be staff of youtube bot please request to his to execute this command !"
    }

