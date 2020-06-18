const Discord = require("discord.js")

module.exports = {
        name: 'bassboost',
        description: 'Change the bass level from disabled to hard.',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        enabled: true,
        DJOnly: true,
        args: true,
        category: "Filters",
        usage: '<off/low/medium/high/hard>',
        aliases: ["bb"],
        execute(client, message, args) {

switch (args[0].toLowerCase()) {
        case "off":
        amt = 0;
        if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
        client.db.guildconf.delete(`${message.guild.id}.bassboost`)
        }
        message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[0].toLowerCase()))
        break;
        case "low":
            amt = 5;
            if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
            client.db.guildconf.delete(`${message.guild.id}.bassboost`)
            }
            message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[0].toLowerCase()))
        break;
        case "medium":
            amt = 10;
            if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
            client.db.guildconf.delete(`${message.guild.id}.bassboost`)
            }
            message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[0].toLowerCase()))
        break;
        case "high":
            amt = 15;
            if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
            client.db.guildconf.delete(`${message.guild.id}.bassboost`)
            }
            message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[0].toLowerCase()))
        break;
        case "hard":
            amt = 20;
            if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
            client.db.guildconf.delete(`${message.guild.id}.bassboost`)
            }
            message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[0].toLowerCase()))
        break;
    default:
        message.channel.send(message.language.get("CONFIG_BASSBOOST_OPTIONS"))
        break;
}

            }


        }