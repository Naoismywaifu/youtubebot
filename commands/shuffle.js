const Discord = require("discord.js")

module.exports = {
        name: 'shuffle',
        description: 'Shuffle the queue',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        DJOnly: true,
        enabled: true,
        category: "Music",
        usage: '',
        aliases: ["melanger"],
        execute(client, message, args) {

            let queue = client.queue.get(message.guild.id);
            if (!queue) return message.channel.send(message.language.get("MUSIC_NO_PLAYING"));
            if (!message.member.voice.channel)
              return message.channel.send(message.language.get("MUSIC_NO_CHANNEL"));
            if (
              queue &&
              message.guild.me.voice.channel.id !== message.member.voice.channel.id
            )
              return message.channel.send(message.language.get("MUSIC_NO_SAME_CHANNEL"));
            if (queue.songs.length < 3)
              return message.channel.send(message.language.get("SHUFFLE_SONGS_LESS"));
            queue.songs = queue.songs.shuffle();
            return message.channel.send(message.language.get("SHUFFLE_SUCCESS"));


            }


        }