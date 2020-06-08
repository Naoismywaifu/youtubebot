const Discord = require("discord.js")

module.exports = {
        name: 'shuffle',
        description: 'Shuffle the queue',
        cooldown: 15,
        guildOnly: true,
        ownerOnly: false,
        args: false,
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
              return message.channel.send(`❌ | You're not in my voice channel!`);
            if (queue.songs.length < 3)
              return message.channel.send("❌ | You can't shuffle less than 3 songs.");
            queue.songs = queue.songs.shuffle();
            return message.channel.send("✅ | Queue shuffled!");


            }


        }