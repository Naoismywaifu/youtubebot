module.exports = {
  name: 'stop',
  description: 'stop the current playing song',
  cooldown: 10,
  args: false,
  DJOnly: true,
  guildOnly: true,
  enabled: true,
  category: "Music",
  usage: '',
  aliases: ["end", "clear", "leave", "dc", "disconnect"],
  execute(client, message) {

    if(client.radiomanager.get(`${message.guild.id}.playing`)){

      if(message.guild.me.voice.channel){
      message.guild.voice.channel.leave()
      }

      client.radiomanager.delete(message.guild.id)

      message.channel.send(message.language.get("STOP_RADIO"))

    } else {


    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);
    if (!serverQueue) return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(message.language.get("STOP_STOPPED", message.author)).catch(console.error);
    }
  }
};
