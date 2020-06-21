const Discord = require("discord.js")

module.exports = {
        name: 'skipto',
        description: 'skip to a specific music !',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: true,
        args: true,
        DJOnly: true,
        enabled: true,
        category: "Music",
        usage: '<nb of songs to skip>',
        args: true,
        aliases: [],
        execute(client, message, args) {

            if(client.radiomanager.get(`${message.guild.id}.playing`)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send(message.language.get("SKIPTO_NOQUEUE")).catch(console.error);
            
            if(isNaN(args[0]) || args[0] <= 0) return message.channel.send(message.language.get("SKIPTO_INVALID_ARG"))
            queue.songs = queue.songs.slice(args[0] - 2);
            queue.connection.dispatcher.end();
            queue.textChannel.send(message.language.get("SKIPTO_SUCCESS", message.author, args[0])).catch(console.error);


            }


        }