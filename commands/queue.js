const Discord = require("discord.js")
module.exports = {
  name: 'queue',
  description: 'Show the list of musics on queue',
  cooldown: 5,
  args: false,
  guildOnly: true,
  enabled: true,
  category: "Music",
  usage: '',
  aliases: ["musics"],
  execute(client, message) {

    if(client.radiomanager.get(`${message.guild.id}.playing`)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);
    if(serverQueue.length < 15){
    var embed = new Discord.MessageEmbed()
    embed.setDescription(`📃 **${message.language.get("QUEUE_SONGQUEUE")}**

    ${serverQueue.songs.map((song, index) => `[ **${index + 1}** ] \`${song.title}\` | \`${song.author}\``).join("\n")}
    
    ${message.language.get("QUEUE_NOWPLAYING")}: **${serverQueue.songs[0].title}**`)
    .setColor("RED")

    
    message.channel.send(embed)
      .catch(console.error);
  } else {
    var embed = new Discord.MessageEmbed()
    message.channel.send(`📃 **${message.language.get("QUEUE_SONGQUEUE")}**

${serverQueue.songs.map((song, index) => `[ **${index + 1}** ] \`${song.title}\` | \`${song.author}\``).join("\n")}
    
${message.language.get("QUEUE_NOWPLAYING")}: **${serverQueue.songs[0].title}**
    `, { split: true })

  }
  }
};
