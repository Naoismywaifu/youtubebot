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
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);
    return message
      .reply(
        `📃 **${message.language.get("QUEUE_SONGQUEUE")}**

${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}

${message.language.get("QUEUE_NOWPLAYING")}: **${serverQueue.songs[0].title}**
		`,
        { split: true }
      )
      .catch(console.error);
  }
};
