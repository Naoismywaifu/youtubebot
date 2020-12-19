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
            song = await this.client.player.getSongs(track, message.guild.id);
        } catch (e) {
            this.client.logger.log(`An error occurred while tried to get search songs: ${e}`, 'error')
            return message.channel.send(message.t("commands:Music.no_audio_nodes_online"));
        }
        if(!song.loadType)
            return message.channel.send(this.t("commands:Music.unknownErrorNode"))

        switch (song.loadType) {
            case "SEARCH_RESULT":
                await this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
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
                await this.client.player.handleVideo(message, message.member.voice.channel, playlist);
                break;
            case "TRACK_LOADED":
                await this.client.player.handleVideo(message, message.member.voice.channel, song.tracks[0]);
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