const { MessageEmbed } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const config = require("./config");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "search",
  description: "Search and select videos to play",
  cooldown: 10,
  args: true,
  guildOnly: true,
  enabled: true,
  DJOnly: true,
  category: "Music",
  usage: '<music>',
  aliases: ["rechercher", "searchmusic"],
  async execute(client, message, args) {

    if(client.radiomanager.get(`${message.guild.id}.playing`)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


    if (message.channel.activeCollector)
      return message.channel.send(message.language.get("SEARCH_COLLECTOR_ALREADY"));
    if (!message.member.voice.channel)
      return message.channel.send("MUSIC_NO_CHANNEL").catch(console.error);

    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**${message.language.get("SEARCH_REPLYWITHSONGNB")}**`)
      .setDescription(message.language.get("SEARCH_RESULTS", search))
      .setColor("RED");

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(`${video.title} - ${video.channel.title}`, `[ **${index + 1}** ] ${video.title}`));


      var resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name
      
      message.channel.activeCollector = false;
      message.client.commands.get("play").execute(client, message, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};