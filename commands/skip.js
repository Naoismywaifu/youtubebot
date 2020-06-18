module.exports = {
  name: 'skip',
  description: 'Skip the current playing song',
  cooldown: 5,
  args: false,
  guildOnly: true,
  enabled: true,
  DJOnly: true,
  category: "Music",
  usage: '',
  aliases: [],
  async execute(client, message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send(message.language.get("MUSIC_NO_CHANNNEL")).catch(console.error);
    if (!serverQueue)
      return message.channel.send(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(message.language.get("SKIP_SKIPPED", message.author)).catch(console.error);
  }
};
