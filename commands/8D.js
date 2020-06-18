const Discord = require("discord.js")

module.exports = {
        name: '8D',
        description: 'Enable or disable the 8D mode.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        DJOnly: true,
        enabled: true,
        category: "Filters",
        usage: '',
        aliases: [],
        execute(client, message, args) {
            if(client.db.guildconf.get(`${message.guild.id}.8d`)){
                client.db.guildconf.set(`${message.guild.id}.8d`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "8D"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.8d`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "8D"))
            }
            }


        }