const Discord = require("discord.js")
const config = require("../config.json")

exports.run = (client, message, args) => {


    message.channel.send("📤 pinging...")
    .then((m) => {
        const embed = new Discord.MessageEmbed()
        .setDescription("🏓 • Pong ! • 🏓")
        .addField("⚓ Bot ping", `» ${m.createdTimestamp - message.createdTimestamp} ms`)
        .addField("📥 Websocket ping", `» ${client.ws.ping} ms`)
        .addField(`[Vote](https://top.gg/bot/486948160124485642/vote) for the bot or [become patreon](https://pateon.com/botyoutube) to support the bot and get some features in plus !`, config.footer)
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