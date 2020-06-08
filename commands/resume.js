module.exports = {
  name: 'resume',
  description: 'Resume the music after a pause.',
  cooldown: 10,
  args: false,
  guildOnly: true,
  enabled: true,
  category: "Music",
  usage: '',
  aliases: ["re-play", "unpause"],
  execute(client, message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return serverQueue.textChannel.send(message.language.get("RESUME_RESUMED", message.author)).catch(console.error);
    }
    return message.channel.send(message.language.get("MUSIC_NO_MUSIC")).catch(console.error);
  }
};
