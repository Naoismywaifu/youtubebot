const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
    }
    
    message.channel.send(`your shard (\`#${client.shard.ids[0]+1}\`) is online since: ${duration(client.uptime)}`)
}

module.exports.help = {
    name: "uptime",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "uptime",
    aliases: ["enligne", "online"],
    description: "get the current uptime of the bot"
    }