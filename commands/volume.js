const { premium } = require("../util/functions");

module.exports = {
  name: 'volume',
  description: 'Change the volume of the current playing',
  cooldown: 10,
  args: false,
  guildOnly: true,
  DJOnly: true,
  enabled: true,
  category: "Music",
  usage: '<0 - 100>',
  aliases: ["aide"],
  execute(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.channel.send(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);
    if (!serverQueue) return message.reply(message.language.get("MUSIC_NO_PLAYING")).catch(console.error);

    if (!args[0])
      return message.channel.send(message.language.get("VOLUME_CURRENT", serverQueue.volume)).catch(console.error);
    if (isNaN(args[0])) return message.reply(message.language.get("VOLUME_ERROR_ARGS")).catch(console.error);
    if (parseInt(args[0]) < 0)
      return message.reply(message.language.get("VOLUME_ERROR_VOLUME")).catch(console.error);

      if(parseInt(args[0]) > 100 && !premium(message)) return message.reply(message.language.get("VOLUME_ERROR_VOLUME")).catch(console.error);
   
      if(parseInt(args[0]) > 200) return message.reply(message.language.get("VOLUME_ERROR_VOLUME_PREMIUM")).catch(console.error);


      serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return serverQueue.textChannel.send(message.language.get("VOLUME_SUCCESS", args[0])).catch(console.error);
  }
};
