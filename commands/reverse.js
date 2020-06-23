const Discord = require("discord.js")

module.exports = {
        name: 'reverse',
        description: 'Enable or disable the reverse mode.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        DJOnly: true,
        premiumOnly: true,
        enabled: true,
        category: "Filters",
        usage: '',
        aliases: [],
        execute(client, message, args) {
            if(client.db.guildconf.get(`${message.guild.id}.reverse`)){
                client.db.guildconf.set(`${message.guild.id}.reverse`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "reverse"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.reverse`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "reverse"))
            }
            }


        }