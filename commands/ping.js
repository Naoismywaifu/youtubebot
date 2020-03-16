const Discord = require("discord.js")
const config = require("../config.json")

exports.run = (client, message, args) => {


    message.channel.send("📤 pinging...")
    .then((m) => {
        const embed = new Discord.MessageEmbed()
        .setDescription("🏓 • Pong ! • 🏓")
        .addField("⚓ Bot ping", `» ${m.createdTimestamp - message.createdTimestamp} ms`)
        .addField("📥 Websocket ping", `» ${client.ws.ping} ms`)
        .addField(`bot's tip: use ${config.prefix}gstart to start a giveaway !`, config.footer)
        m.edit(embed)
    })
}

module.exports.help = {
    name: "ping",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: false,
    aliases: ["latence", "pong", "png"],
    description: "Pong ?"
    }