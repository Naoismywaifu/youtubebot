module.exports = {
  name: 'pause',
  description: 'Pause the current playing song.',
  cooldown: 7,
  args: false,
  guildOnly: true,
  enabled: true,
  DJOnly: true,
  category: "Music",
  usage: '',
  aliases: [],
  execute(client, message) {
    if (!message.member.voice.channel)
      return message.reply(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);
      return serverQueue.textChannel.send(message.language.get("PAUSE_PAUSED", message.author)).catch(console.error);
    }
    return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);
  }
};
