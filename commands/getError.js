const DBLAPI = require("dblapi.js")
const  Discord = require("discord.js")

module.exports = {
    name: 'getError',
    description: 'get details about a error.',
    cooldown: 15,
    guildOnly: true,
    ownerOnly: true,
    args: true,
    enabled: true,
    category: "Owner",
    usage: '<errorid>',
    aliases: ["geterr", "getErr", "geterror"],
    execute(client, message, args) {

        if(!client.db.errors.has(args[0])) return message.channel.send(message.language.get("GETERROR_INVALID_ID"))

        let emb = new Discord.MessageEmbed()
        .setDescription(`${message.language.get("GETERROR_ERROR")}: \`${client.db.errors.get(`${args[0]}.err`)}\` (${client.db.errors.get(`${args[0]}.nameerr`)})
        
        ${message.language.get("GETERROR_IDS", client.db.errors.get(`${args[0]}.guild`), client.db.errors.get(`${args[0]}.user`), client.db.errors.get(`${args[0]}.date`))}`)
        .setColor("RED")
        .setTimestamp()
        
        return message.channel.send(emb)
}

}