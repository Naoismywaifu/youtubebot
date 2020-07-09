const config = require("../config.json")
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY_NOTIFIER);


module.exports = {
    name: 'notify',
    description: 'notify in a discord channel when your favorite youtuber upload a new video',
    cooldown: 15,
    args: true,
    guildOnly: true,
    staffOnly: true,
    enabled: true,
    category: "Notifier",
    usage: '<#channel> <youtuber>',
    aliases: ["ytnotify", "notifier"],
    async execute(client, message, args) {


      if(!args[0] && !message.mentions.channels.first()) return message.channel.send(message.language.get("NOTIFY_NO_CHANNEL_MENTION"))
      if(!client.channels.cache.get(args[0]) && !message.mentions.channels.first()) 
      return message.channel.send(message.language.get("NOTIFY_INVALID_CHANNEL"))
    
      async function getYoutubeChannelInfos(name){
        console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Resolving channel infos...`);
                    let channels = await youtube.searchChannels(name, 1)
                      console.log(channels)
              if(channels.length > 0){
                  out = {
                          title: channels[0].raw.snippet.title,
                          id: channels[0].id 
                        }
                return out;
              } else {
                return false;
              }

           }

      
      if(!args[1])
      return message.channel.send(message.language.get("NOTIFY_INVALID_YT_CHANNEL"))

      message.channel.send(message.language.get("NOTIFY_CHECKING")).then((m) => {
       getYoutubeChannelInfos(args.slice(1).join(" ")).then((out) => {
         console.log(out)
        if(!out){
        return m.edit(message.language.get("NOTIFY_NOT_EXIST"))
        } else {
        m.edit(message.language.get("NOTIFY_SUCCESS"))

          if(message.mentions.channels.first()){
            var channelid = message.mentions.channels.first().id
          } else {
            var channelid = client.channels.cache.get(args[0]).id
          }


          client.db.notifier.set(`${message.guild.id}.channelid`, out.id)
          client.db.notifier.set(`${message.guild.id}.channel`, channelid)
          client.db.notifier.set(`${message.guild.id}.youtuber`, out.title)


        }
      })
    })
    }
  
  };
  