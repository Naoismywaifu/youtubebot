module.exports = {
  name: 'loop',
  description: 'toggle the music repeat mode',
  cooldown: 5,
  args: false,
  guildOnly: true,
  enabled: true,
  DJOnly: true,
  category: "Music",
  usage: '',
  aliases: ["repeat", "rejouer"],
  async execute(client, message) {

    if(client.radiomanager.get(`${message.guild.id}.playing`)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    // toggle from false to true and reverse
    serverQueue.loop = !serverQueue.loop;
    return serverQueue.textChannel
      .send(message.language.get("LOOP_LOOP", serverQueue.loop ? message.language.get("UTILS").ON : message.language.get("UTILS").OFF))
      .catch(console.error);
  }
};
