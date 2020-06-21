const { play } = require("../include/play");
const { YOUTUBE_API_KEY, MAX_PLAYLIST_SIZE, MAX_PREMIUM_PLAYLIST_SIZE } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const { Message, MessageEmbed } = require("discord.js");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const Discord = require("discord.js")
module.exports = {
  name: 'playlist',
  description: 'play a playlist from youtube to your discord channel !',
  cooldown: 15,
  args: true,
  guildOnly: true,
  enabled: true,
  DJOnly: true,
  category: "Music", 
  usage: '<Query | Url>',
  aliases: ["play-playlist", "play-list"],
  async execute(client, message, args) {

    if(client.radiomanager.get(`${message.guild.id}.playing`)) return message.channel.send(message.language.get("MUSIC_RADIO_PLAYING"))


    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(message.language.get("MUSIC_NO_CHANNEL")).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(message.language.get("PLAY_PERM_CONNECT"));
    if (!permissions.has("SPEAK"))
      return message.channel.send(message.language.get("PLAY_PERM_SPEAK"));

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const serverQueue = message.client.queue.get(message.guild.id);
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let song = null;
    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(client.db.guildconf.get(`${message.guild.id}.premium`) ? MAX_PREMIUM_PLAYLIST_SIZE : MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
        if(!results[0]) return message.channel.send(message.language.get("MUSIC_QUERY_NOT_EXIST"))
        playlist = results[0];
        videos = await playlist.getVideos(client.db.guildconf.get(`${message.guild.id}.premium`) ? MAX_PREMIUM_PLAYLIST_SIZE : MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
      } catch (error) {
        console.error(error);
      }
    }
    videos.forEach(video => {
      
      song = {
        title: video.title,
        url: `https://youtube.com/watch?v=${video.id}`,
        id: video.id,
        playlist: true,
        author: video.raw.snippet.channelTitle,
        thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
            };

      if (serverQueue) {
        serverQueue.songs.push(song);
        message.channel
          .send(message.language.get("PLAYLIST_ADDED_SONG", song, message.author))
          .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });
let embed = new Discord.MessageEmbed()
.setDescription(message.language.get("PLAYLIST_ADDED_PLAYLIST", playlist, message.author, queueConstruct, client.db.guildconf.get(`${message.guild.id}.premium`) ? true : false))
.setColor("RED")

message.channel.send(embed)
      .catch(console.error);

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`❌ | Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(message.language.get("MUSIC_JOIN_ERROR", error)).catch(console.error);
      }
    }
  }
};
