const Discord = require("discord.js")

module.exports = {
        name: 'normalizer',
        description: 'Enable or disable the normalizer mode.',
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
                if(client.db.guildconf.get(`${message.guild.id}.normalizer`)){
                    client.db.guildconf.set(`${message.guild.id}.normalizer`, false)
                    message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "normalizer"))
                } else {
                    client.db.guildconf.set(`${message.guild.id}.normalizer`, true)
                    message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", 'normalizer'))
                }
            }


        }