module.exports = {
  name: 'remove',
  description: 'Remove a song from the queue.',
  cooldown: 5,
  args: false,
  guildOnly: true,
  DJOnly: true,
  enabled: true,
  category: "Music",
  usage: '<Queue number>',
  aliases: ["remqueue"],
  async execute(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    const song = serverQueue.songs.splice(args[0] - 1, 1);
    serverQueue.textChannel.send(message.language.get("REMOVE_REMOVED", message.author, song[0]));
  }
};
