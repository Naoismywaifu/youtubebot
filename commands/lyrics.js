const cheerio = require("cheerio");
const axios = require('axios');
const Discord = require('discord.js');
const config = require("../config.json")

const baseURL = `https://api.genius.com/search?access_token=${config.GENIUS_API}`;

const scrapeLyrics = path => {
  return axios.get(path)
    .then(response => {
      let $ = cheerio.load(response.data);
      return [$('.header_with_cover_art-primary_info-title').text().trim(), $('.lyrics').text().trim()];
    })
    .catch(err => {
      console.warn(err);
    });
};

const searchLyrics = url => {
  return Promise.resolve(axios.get(url, {'Authorization': `Bearer ${config.GENIUS_API}`})
    .then(response => checkSpotify(response.data.response.hits))
    .then(path => scrapeLyrics(path))
    .catch(err => {
      console.warn(err);
    })
  );
};

const checkSpotify = hits => {
  return hits[0].result.primary_artist.name === 'Spotify' ? hits[1].result.url : hits[0].result.url;
};

module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: true,
    enabled: true,
    category: "Music",
    usage: '<song>',
    aliases: ["paroles"],
    async execute(client, message, args) {


      
        const query = args.join(" ")
        searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
          .then(songData => {
            if(songData[0] === query || !songData[0]) 
            return message.channel.send(message.language.get("LYRICS_NOT_FOUND", query));
            const embed = new Discord.MessageEmbed()
              .setColor(0x00AE86)
              .setTitle(message.language.get("LYRICS_SUCCESS", songData[0]))
              .setDescription(songData[1].slice(0, 2040));
            return message.channel.send({embed});
          })
          .catch(err => {
            message.channel.send(message.language.get("LYRICS_NOT_FOUND", query));
            console.warn(err);
          });

}


}