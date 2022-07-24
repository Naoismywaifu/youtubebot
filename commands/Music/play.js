const yts = require( 'yt-search' )
const Command = require("../../Base/Command");

class Play extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            DJOnly: true,
            guildOnly: true,
            botPerms: ["CONNECT", "SPEAK"],
            aliases: ["p", "jouer"],
        });

    }

    async run(message, args) {


        if (!message.member.voice.channel)
            return message.channel.send(this.t("commands:Music.play.novc"));

        if(!message.member.voice.channel.joinable)
            return message.channel.send(this.t("commands:Music.unjoinable"))
        if(!message.member.voice.channel.speakable)
            return message.channel.send(this.t("commands:Music.unspeakable"))


        let song;

        let track = args.join(" ")
        try {
           
              // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
              song = await this.client.player.manager.search(track, message.author);
              // Check the load type as this command is not that advanced for basics

              console.log(song)

              if(!song.loadType)
                return message.channel.send(this.t("commands:Music.unknownErrorNode"))

          switch (song.loadType) {
              case "SEARCH_RESULT":
                  await this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
                  break;
              case "NO_MATCHES":
                        let try2 = await yts(track).then(res => res.videos[0].url)
                        if(!try2)
                            return this.error(message, "there is no matching video with your query")
                        song = await this.client.player.manager.search(try2, message.author);
                        console.log(song)
                        if(song.loadType !== "SEARCH_RESULT" && song.loadType !== "TRACK_LOADED")
                            return this.error(message, "there is no matching video with your query")
                        await this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
                  break;
              case "LOAD_FAILED":
                  this.error(message, "failed to load the track")
                  break;
              case "PLAYLIST_LOADED":
                  let selected = song.playlist.name;
  
                  if (typeof selected != "string")
                    return [ song.tracks[selected] ];
        
                  let playlist = song.tracks.slice(0, 200);
                  await this.client.player.handleVideo(message, message.member.voice.channel, playlist);
                  break;
              case "TRACK_LOADED":
                  await this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
                  break;
              default:
                  this.error(message, "unknown error code")
                  break;
          }
        } catch (e) {
            this.client.logger.log(`An error occurred while tried to get search songs: ${e}`, 'error')
            return message.channel.send(message.t("commands:Music.no_audio_nodes_online"));
        }
        

    }


    error(message, err) {
        return message.channel.send(this.t("commands:Music.play.error", { err }))
     }
    

}

module.exports = Play;