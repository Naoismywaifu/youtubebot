module.exports = {
  name: 'stop',
  description: 'stop the current playing song',
  cooldown: 10,
  args: false,
  guildOnly: true,
  enabled: true,
  category: "Music",
  usage: '',
  aliases: ["end", "clear"],
  execute(client, message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);
    if (!serverQueue) return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(message.language.get("STOP_STOPPED", message.author)).catch(console.error);
  }
};
