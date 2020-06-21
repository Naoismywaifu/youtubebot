const { play } = require("../include/play");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
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
        var uploaddate = Date(songInfo.published)
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          id: songInfo.video_id,
          underrage: songInfo.age_restricted,
          likes: songInfo.likes||0,
          playlist: false,
          live: songInfo.player_response.videoDetails.isLiveContent,
          dislikes: songInfo.dislikes||0,
          views: songInfo.player_response.videoDetails.viewCount,
          shortDesc: songInfo.player_response.videoDetails.shortDescription.slice(0,512), 
          upload: uploaddate,
          tags: songInfo.player_response.videoDetails.keywords,
          author: songInfo.author.name,
          verified: songInfo.author.verified,
          author_channel: songInfo.author.channel_url,
          thumbnail: `https://i.ytimg.com/vi/${songInfo.video_id}/hqdefault.jpg`,
          duration: songInfo.length_seconds
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

        
        const results = await youtube.searchVideos(search, 1);
        if(!results[0]) return message.channel.send(message.language.get("MUSIC_QUERY_NOT_EXIST"))



        songInfo = await ytdl.getInfo(results[0].url);
        var uploaddate = new Date(songInfo.published)
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          id: songInfo.video_id,
          underrage: songInfo.age_restricted,
          likes: songInfo.likes||0,

          dislikes: songInfo.dislikes||0,
          views: songInfo.player_response.videoDetails.viewCount,
          live: songInfo.player_response.videoDetails.isLiveContent,
          shortDesc: songInfo.player_response.videoDetails.shortDescription.slice(0,512), 
          upload: uploaddate,
          tags: songInfo.player_response.videoDetails.keywords,
          author: songInfo.author.name,
          verified: songInfo.author.verified,
          author_channel: songInfo.author.channel_url,
          thumbnail: `https://i.ytimg.com/vi/${songInfo.video_id}/hqdefault.jpg`,
          duration: songInfo.length_seconds
        };
      } catch (error) {
        console.error(error);
        message.chnnel.send(message.language.get("MUSIC_NO_EXIST"))
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
    }

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
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
