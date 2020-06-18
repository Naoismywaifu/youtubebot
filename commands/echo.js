const Discord = require("discord.js")

module.exports = {
        name: 'echo',
        description: 'Enable or disable the echo mode.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        DJOnly: true,
        args: false,
        enabled: true,
        category: "Filters",
        usage: '',
        aliases: [],
        execute(client, message, args) {
            if(client.db.guildconf.get(`${message.guild.id}.echo`)){
                client.db.guildconf.set(`${message.guild.id}.echo`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "echo"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.echo`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "echo"))
            }
            }


        }