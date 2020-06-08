const Discord = require("discord.js")

module.exports = {
        name: 'ping',
        description: 'pong ?',
        cooldown: 5,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: ["pong"],
        execute(client, message, args) {

            let a = Date.now()

            message.channel.send(message.language.get("PING_PINGING")).then((m) => {
                let b = Date.now()
                m.edit(message.language.get("PING_PONG", b - a, client.ws.ping))
            })


            }


        }