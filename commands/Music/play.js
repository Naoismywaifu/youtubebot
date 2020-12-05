const Command = require("../../Base/Command");

class Play extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p", "jouer"],
        });

    }

    async run(message, args) {


        if (!message.member.voice.channel) return message.channel.send(this.t("commands:Music.play.novc"));

        let track = args.join(" ")
        
        let song = await this.client.player.getSongs(track);
        switch (song.loadType) {
            case "SEARCH_RESULT":
                this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
                break;
            case "NO_MATCHES":
                this.error(message, "there is no matching video with your query")
                break;
            case "LOAD_FAILED":
                this.error(message, "failed to load the track")
                break;
            case "PLAYLIST_LOADED":
                let selected = song.playlistInfo.selectedTrack;

                if (selected !== -1)
                  return [ song.tracks[selected] ];
      
                let playlist = song.tracks.slice(0, 200);
                this.client.player.handleVideo(message, message.member.voice.channel, playlist);
                break;
            case "TRACK_LOADED":
                this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
                break;
            default:
                this.error(message, "unknown error code")
                break;
        }
        

    }


    error(message, err) {
        return message.channel.send(this.t("commands:Music.play.error", { err }))
     }
    

}

module.exports = Play;