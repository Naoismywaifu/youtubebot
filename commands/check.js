const  Discord = require("discord.js")

module.exports = {
    name: 'check',
    description: 'invite the bot on your server.',
    cooldown: 15,
    guildOnly: true,
    ownerOnly: true,
    args: false,
    enabled: false,
    category: "Owner",
    usage: '',
    aliases: [],
    execute(client, message, args) {
        if(require("../util/functions.js").isStaff(message)){
            message.reply("is staff")
        } else {
            message.reply("is NOT staff")
        }


        if(require("../util/functions.js").isDJ(message)){
            message.reply("is DJ")
        } else {
            message.reply("is NOT DJ")
        }
}


        }