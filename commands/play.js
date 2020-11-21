const { play } = require("../include/play");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const ytsr = require('ytsr');
const YouTubeAPI = require("simple-youtube-api");
const { codePointAt } = require("ffmpeg-static");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: 'play',
  description: 'Play a video from youtube to a discord channel !',
  cooldown: 4,
  args: true,
  guildOnly: true,
  DJOnly: true,
  enabled: true,
  category: "Music",
  usage: '<query | video url | playlist url>',
  aliases: ["jouer", "youtube"],
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
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(client, message, args);
    }

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

    let songInfo = null;
    let song = null;
    if (urlValid) {
      try {

        songInfo = await ytdl.getInfo(url);
        console.log(songInfo)
        var uploaddate = Date(songInfo.videoDetails.publishDate)
        song = {
          playlist: false,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          id: songInfo.videoDetails.videoId,
          underrage: songInfo.videoDetails.age_restricted,
          likes: songInfo.videoDetails.likes||0,
          dislikes: songInfo.videoDetails.dislikes||0,
          views: songInfo.player_response.videoDetails.viewCount||0,
          live: songInfo.player_response.videoDetails.isLiveContent||false,
          shortDesc: songInfo.player_response.videoDetails.shortDescription.slice(0,512)||"Unavailable", 
          upload: uploaddate||0,
          tags: songInfo.player_response.videoDetails.keywords||"none",
          author: songInfo.videoDetails.author.name||"unavailable",
          verified: songInfo.videoDetails.author.verified||false,
          author_channel: songInfo.videoDetails.author.channel_url||"unavailable",
          thumbnail: `https://i.ytimg.com/vi/${songInfo.videoDetails.videoId||null}/hqdefault.jpg`,
          duration: songInfo.videoDetails.lengthSeconds||null
        };
      } catch (error) {
        if (error.message.includes("copyright")) {
          return message
            .channel.send(message.language.get("PLAY_ERROR_COPYRIGHT"))
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        message.channel.send(message.language.get("MUSIC_SEARCHING", search))

        //const results = await youtube.searchVideos(search, 1);
        
        let videourl;

        let filters = await ytsr.getFilters(search)
          const filter = filters.get('Type').find(o => o.name === 'Video');
          const options = {
            limit: 2,
            nextpageRef: filter.ref
          }
          const searchResults = await ytsr(search, options);

          videourl = searchResults.items[1].link;

          if(!videourl) return message.channel.send(message.language.get("MUSIC_QUERY_NOT_EXIST"))


        songInfo = await ytdl.getInfo(videourl);
        var uploaddate = new Date(songInfo.videoDetails.publishDate)
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          id: songInfo.videoDetails.videoId,
          underrage: songInfo.videoDetails.age_restricted,
          likes: songInfo.videoDetails.likes||0,
          dislikes: songInfo.videoDetails.dislikes||0,
          views: songInfo.player_response.videoDetails.viewCount||0,
          live: songInfo.player_response.videoDetails.isLiveContent||false,
          shortDesc: songInfo.player_response.videoDetails.shortDescription.slice(0,512)||"Unavailable", 
          upload: uploaddate||0,
          tags: songInfo.player_response.videoDetails.keywords||"none",
          author: songInfo.videoDetails.author.name||"unavailable",
          verified: songInfo.videoDetails.author.verified||false,
          author_channel: songInfo.videoDetails.author.channel_url||"unavailable",
          thumbnail: `https://i.ytimg.com/vi/${songInfo.videoDetails.videoId||null}/hqdefault.jpg`,
          duration: songInfo.videoDetails.lengthSeconds||null
        };
      } catch (error) {
        console.error(error);
        return message.chnnel.send(message.language.get("MUSIC_NO_EXIST"))
      }
    }

if(song.live){
  if(!client.db.guildconf.get(`${message.guild.id}.premium`)){
    return message.channel.send(message.language.get("MUSIC_LIVE_PREMIUM_ONLY"));
  }
}


    if (serverQueue) {

      if(serverQueue.connection.dispatcher.paused){
        return message.channel.send(message.language.get("PLAY_ERR_PAUSED"))
      }

      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(message.language.get("PLAY_ADDED_QUEUE", song.title, message.author.tag))
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
      message.client.queue.set(message.guild.id, queueConstruct);
      try {
        queueConstruct.connection = await channel.join();
        console.log(queueConstruct.songs[0])
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
