const Discord = require("discord.js")

module.exports = {
        name: 'nightcore',
        description: 'Enable or disable the nightcore mode.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        DJOnly: true,
        enabled: true,
        category: "Filters",
        usage: '',
        aliases: ["nightc", "corenight", "nc"],
        execute(client, message, args) {
            if(client.db.guildconf.get(`${message.guild.id}.nightcore`)){
                client.db.guildconf.set(`${message.guild.id}.nightcore`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "nightcore"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.nightcore`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "nightcore"))
            }
            }


        }