const ytdlDiscord = require("discord-ytdl-core");
const { DiscordAPIError, MessageEmbed } = require("discord.js");
const { isDJ, isStaff } = require("../util/functions")
const Discord = require("discord.js")
module.exports = {
  async play(song, message) {

    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel.send(message.language.get("MUSIC_ENDED")).catch(console.error);
    }

    let effectfinal = []

    if(message.client.db.guildconf.get(`${message.guild.id}.bassboost`)){
      effectfinal.push(`bass=g=${message.client.db.guildconf.get(`${message.guild.id}.bassboost`)}`)
    }

    if(message.client.db.guildconf.get(`${message.guild.id}.vaporwave`)){
      effectfinal.push("asetrate=44100*0.8,aresample=44100,atempo=1.1")
    }

    if(message.client.db.guildconf.get(`${message.guild.id}.nightcore`)){
      effectfinal.push("asetrate=44100*1.25")
    }

    if(message.client.db.guildconf.get(`${message.guild.id}.echo`)){
      effectfinal.push("aecho=0.6:0.3:1000:0.5")
    }
    if(message.client.db.guildconf.get(`${message.guild.id}.8d`)){
      effectfinal.push("apulsator=hz=0.128")
    }
    if(message.client.db.guildconf.get(`${message.guild.id}.reverse`)){
      effectfinal.push("areverse")
    }
    if(message.client.db.guildconf.get(`${message.guild.id}.normalizer`)){
      effectfinal.push("dynaudnorm=f=150")
    }



    try {
      if(effectfinal.length === 0){
        if(!song.live){
        var stream = await ytdlDiscord(song.url, { 
          highWaterMark: 1 << 25, 
          filter: "audioonly"
                }).on("error", err => {
                  if(err.code === "403"){
                    message.channel
                    .send(message.language.get("MUSIC_ERR_QUOTA"))
                    .catch(console.error);
                  }
                })
              } else {
                var stream = await ytdlDiscord(song.url, { 
                  highWaterMark: 100,
                  fec: true,
                  plp: 30,
                  quality: 'lowestaudio',
                  bitrate: 64,
                  filter: "audioonly"
                        }).on("error", err => {
                          if(err.code === "403"){
                            message.channel
                            .send(message.language.get("MUSIC_ERR_QUOTA"))
                            .catch(console.error);
                          }
                        })
              }
      } else {
        if(!song.live){
      var stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25, 
        filter: "audioonly",
        encoderArgs: ['-af', `${effectfinal.length > 0 ? effectfinal.join(",") : ""}`]
      }).on("error", err => {
        if(err.code === "403"){
          message.channel
          .send(message.language.get("MUSIC_ERR_QUOTA"))
          .catch(console.error);
        }
      })
    } else {
      var stream = await ytdlDiscord(song.url, { 
        highWaterMark: 100,
        fec: true,
        plp: 30,
        quality: 'lowestaudio',
        bitrate: 64,
        filter: "audioonly",
        encoderArgs: ['-af', `${effectfinal.length > 0 ? effectfinal.join(",") : ""}`]
      }).on("error", err => {
        if(err.code === "403"){
          message.channel
          .send(message.language.get("MUSIC_ERR_QUOTA"))
          .catch(console.error);
        }
      })
    }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes("copyright")) {
        return message.channel
          .send(message.language.get("MUSIC_ERR_COPYRIGHT"))
          .catch(console.error);
      } else if (error.code === "403") {
        return message.channel
          .send(message.language.get("MUSIC_ERR_QUOTA"))
          .catch(console.error);
      } else {

        return console.error("unknown error: " + error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "converted" })
      .on("finish", () => {
        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", err => {
        if(err.code === "403"){
          message.channel
          .send(message.language.get("MUSIC_ERR_QUOTA"))
          .catch(console.error);
        } else if(err){
        console.error(err);
        }
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    try {

      if(!message.client.db.guildconf.get(`${message.guild.id}.compact`) && !song.playlist){
/*       \`\`\`asciidoc
= ${message.language.get("MUSIC_SHORT_DESC")} =
${song.shortDesc}
\`\`\`
*/

      var embed = new MessageEmbed()
      .setThumbnail(song.thumbnail)
      embed.addField(`🎶 ${message.language.get("MUSIC_NOWPLAYING")} 🎶`, `
      <a:disk:719524203983929375> ❱ ${song.title} ${song.underrage ? ` **[🔞 ${message.language.get("UTILS").RESTRICTED}]**` : ""} ${song.live ? " **[🔴 live]**" : ""}
      <:plus:719323001677676575> ❱ ${song.author} ${song.verified ? "<:verified:719526360703434862>" : ""}
      <:date:719524185407225876> ❱ ${message.language.get("MUSIC_PUBLISHED", message.language.printDate(song.upload), true)}
      `, false)

      embed.addField(message.language.get("UTILS").LIKES, `${song.likes} <:like:719487585881423953>`, true)
      embed.addField(message.language.get("UTILS").DISLIKES, `${song.dislikes} <:dislike:719487584031735879>`, true)
      embed.addField(message.language.get("UTILS").VIEWS, `${song.views} 👁`, true)
    } else {
var embed = new MessageEmbed()
.setDescription(message.language.get("PLAY_NOWPLAYING_COMPACT", song))
.setThumbnail(song.thumbnail)
.setFooter(message.language.get("FOOTER_REQUESTEDBY", message.author.tag), message.author.displayAvatarURL({ dynamic: true }))
    }
      var playingMessage = await queue.textChannel.send(embed)
      // var playingMessage = await queue.textChannel.send(` Started playing: **${song.title}** ${song.url} by ${song.author} id: ${song.id} verified ? : ${song.verified}, thumbnail: ${song.thumbnail}, author : ${song.author_channel}\nLikes: ${song.likes} | Dislikes ${song.dislikes} | Underrage ? ${song.underrage}`);
      await playingMessage.react("⏭");
      await playingMessage.react("⏸");
      await playingMessage.react("▶");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    const collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      // Stop if there is no queue on the server
      if (!queue) return;




      switch (reaction.emoji.name) {
        case "⏭":
          if(user.id !== message.author.id) return message.channel.send(message.language.get("MUSIC_ISNOT_INVOKER", user.username))
          queue.connection.dispatcher.end();
          queue.textChannel.send(message.language.get("SKIP_SKIPPED", message.author)).catch(console.error);
          collector.stop();
          break;

        case "⏸":
          if(user.id !== message.author.id) return message.channel.send(message.language.get("MUSIC_ISNOT_INVOKER", user.username))

          if (!queue.playing) break;
          queue.playing = false;
          queue.connection.dispatcher.pause();
          queue.textChannel.send(message.language.get("PAUSE_PAUSED", message.author)).catch(console.error);
          reaction.users.remove(user);
          break;

        case "▶":
          if(user.id !== message.author.id) return message.channel.send(message.language.get("MUSIC_ISNOT_INVOKER", user.username)).then(msg => {
            msg.delete(10000)
          })

          if (queue.playing) break;
          queue.playing = true;
          queue.connection.dispatcher.resume();
          queue.textChannel.send(message.language.get("RESUME_RESUMED", message.author)).catch(console.error);
          reaction.users.remove(user);
          break;

        case "🔁":
          if(user.id !== message.author.id) return message.channel.send(message.language.get("MUSIC_ISNOT_INVOKER", user.username))

          queue.loop = !queue.loop;
          queue.textChannel
            .send(message.language.get("LOOP_LOOP", queue.loop ? message.language.get("UTILS").ON : message.language.get("UTILS").OFF))
            .catch(console.error);
          reaction.users.remove(user);
          break;

        case "⏹":
          if(user.id !== message.author.id) return message.channel.send(message.language.get("MUSIC_ISNOT_INVOKER", user.username))
          queue.songs = [];
          queue.textChannel.send(message.language.get("STOP_STOPPED", message.author)).catch(console.error);
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

        default:
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().then(playingMessage.delete());
    });
  }
};
