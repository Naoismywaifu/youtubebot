const config = require("../config.json")
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY);


module.exports = {
    name: 'notify',
    description: 'notify in a discord channel when your favorite youtuber upload a new video',
    cooldown: 1,
    args: true,
    guildOnly: true,
    enabled: true,
    category: "Notifier",
    usage: '<#channel> <youtuber>',
    aliases: ["ytnotify", "notifier"],
    async execute(client, message, args) {


      if(!args[0] && !message.mentions.channels.first()) return message.channel.send("please provide a valid channel mention")
      if(!client.channels.cache.get(args[0]) && !message.mentions.channels.first()) 
      return message.channel.send("please provide a valid channel mention")
    
      async function getYoutubeChannelInfos(name){
        console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Resolving channel infos...`);
                    let channels = await youtube.searchChannels(name, 1)
                      console.log(channels)
              if(channels.length > 0){
                  
                return channels[0].raw.snippet.title;
              } else {
                return false;
              }

           }

      
      if(!args[1])
      return message.channel.send(" please provide a valid youtube channel name !")

      message.channel.send("checking the youtube channel name...").then((m) => {
       getYoutubeChannelInfos(args[1]).then((out) => {
         console.log(out)
        if(!out){
        return m.edit("this user don't exist !")
        } else {
        m.edit("yes ! ")

          if(message.mentions.channels.first()){
            var channelid = message.mentions.channels.first().id
          } else {
            var channelid = client.channels.cache.get(args[0]).id
          }



          client.db.notifier.set(`${message.guild.id}.channel`, channelid)
          client.db.notifier.set(`${message.guild.id}.youtuber`, out)


        }
      })
    })
    }
  
  };
  