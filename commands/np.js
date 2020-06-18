let { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'np',
    description: 'Fetch informations about the current music.',
    cooldown: 10,
    args: false,
    guildOnly: true,
    enabled: true,
    category: "Music",
    usage: '',
    aliases: ["now-playing", "nowplaying", "current", "now"],
    execute(client, message) {
      if (!message.member.voice.channel)
        return message.reply(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);
  
      const serverQueue = message.client.queue.get(message.guild.id);
      if (serverQueue && serverQueue.playing) {
        let title = serverQueue.songs[0].title
        let author = serverQueue.songs[0].author
        let thumbnail = serverQueue.songs[0].thumbnail
        let url = serverQueue.songs[0].url

        let embed = new MessageEmbed()
        .setDescription(message.language.get("NP_CURRENT", title, author, url))
        .setColor("RED")
        .setThumbnail(thumbnail)

        return message.channel.send(embed)

      }
      return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);
    }
  };
  