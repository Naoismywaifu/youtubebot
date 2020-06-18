const Discord = require("discord.js")

module.exports = {
        name: 'vaporwave',
        description: 'Enable or disable the ｖａｐｏｒｗａｖｅ mode.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        DJOnly: true,
        enabled: true,
        category: "Filters",
        usage: '',
        aliases: ["vw", "vawevapor", "ｖａｐｏｒｗａｖｅ"],
        execute(client, message, args) {
            if(client.db.guildconf.get(`${message.guild.id}.vaporwave`)){
                client.db.guildconf.set(`${message.guild.id}.vaporwave`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "ｖａｐｏｒｗａｖｅ"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.vaporwave`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "ｖａｐｏｒｗａｖｅ"))
            }


        }

}