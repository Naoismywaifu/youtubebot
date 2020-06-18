const Discord = require("discord.js")

module.exports = {
        name: 'redeem',
        description: 'Redeem an exsting youtube bot premium code to get it in your wallet!',
        cooldown: 10,
        guildOnly: false,
        ownerOnly: false,
        args: true,
        enabled: true,
        category: "Premium",
        usage: '<AAAAA-BBBBB-YOUTUBE-BOT20>',
        aliases: ["getpremium", "getPremium", "activer"],
        execute(client, message, args) {



            if(!client.db.codes.get(args[0])) return message.channel.send(message.language.get("REDEEM_CODE_EXISTS"))

            client.db.users.add(`${message.author.id}.premiums`, 1)

            client.db.codes.delete(args[0])

            message.channel.send(message.language.get("REDEEM_SUCCESS"))

            }


        }