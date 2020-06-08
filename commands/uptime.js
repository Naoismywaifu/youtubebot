const Discord = require("discord.js")

module.exports = {
        name: 'uptime',
        description: 'get the uptime of the bot',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: ["online"],
        execute(client, message, args) {

            message.channel.send(message.language.get("UPTIME_MESSAGE", message.language.convertMs(client.uptime)))


            }


        }