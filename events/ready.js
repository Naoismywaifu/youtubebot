const Discord = require("discord.js")
const config = require("../config.json")
const Parser = require("rss-parser");
const { split } = require("ffmpeg-static");
const parser = new Parser();
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY_NOTIFIER);

exports.run = async (client) => {
	console.log(`${client.user.username} ready!`);
    client.user.setActivity(`YouTube Bot ⋄ ${client.prefix}help ⋄ Shard ${client.shard.ids[0] + 1}/${client.shard.count}`, { tyoe: "LISTENING" });
    

const startAt = Date.now();
const lastVideos = {};


function formatDate(date) {
    let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
    return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
}


async function getLastVideo(youtubeChannelName, rssURL){
    //console.log(`[${youtubeChannelName}]  | Getting videos...`);
    let content = await parser.parseURL(rssURL);
    //console.log(`[${youtubeChannelName}]  | ${content.items.length} videos found`);
    let tLastVideos = content.items.sort((a, b) => {
        let aPubDate = new Date(a.pubDate || 0).getTime();
        let bPubDate = new Date(b.pubDate || 0).getTime();
        return bPubDate - aPubDate;
    });
    console.log(`[${youtubeChannelName}]  | The last video is "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`);
    return tLastVideos[0];
}


async function checkVideos(youtubeChannelName, rssURL){
    console.log(`[${youtubeChannelName}] | Get the last video..`);
    let lastVideo = await getLastVideo(youtubeChannelName, rssURL);
    // If there isn't any video in the youtube channel, return
    if(!lastVideo) return console.log("[ERR] | No video found for "+lastVideo);
    // If the date of the last uploaded video is older than the date of the bot starts, return 


    if(new Date(lastVideo.pubDate).getTime() < startAt) return console.log(`[${youtubeChannelName}] | Last video was uploaded before the bot starts`);

    let lastSavedVideo = lastVideos[youtubeChannelName];

    console.log(lastSavedVideo)
    console.log(lastVideo)
    // If the last video is the same as the last saved, return
    if(lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return console.log(`[${youtubeChannelName}] | Last video is the same as the last saved`);

    return lastVideo;
}


async function getYoutubeChannelInfos(name){
    let channel = null;

        let channels = await youtube.searchChannels(name, 2);
        if(channels.length > 0){
            channel = channels[0];
        }
    
    return channel;
}

/**
 * Check for new videos
 */
async function check(client){
    console.log("Checking...");
    client.db.notifier.all().forEach(async (guild) => {
        if(!client.guilds.cache.get(guild.ID)) return;
        if(!client.db.notifier.has(`${guild.ID}.youtuber`)) return;
        if(!client.db.notifier.has(`${guild.ID}.channel`)) return;

        if(!client.db.notifier.has(`${guild.ID}.youtuberid`)){
           let ch = await getYoutubeChannelInfos(client.db.notifier.get(`${guild.ID}.youtuber`))
        
            client.db.notifier.set(`${guild.ID}.youtuberid`, ch.id)
        
        }

        var youtuber = client.db.notifier.fetch(`${guild.ID}.youtuber`)
        if(!youtuber) return client.db.notifier.delete(guild.ID);

        let video = await checkVideos(client.db.notifier.get(`${guild.ID}.youtuberid`), "https://www.youtube.com/feeds/videos.xml?channel_id="+client.db.notifier.get(`${guild.ID}.youtuberid`));
        if(!video) return console.log(`No notification`);
        let channel = client.channels.cache.get(client.db.notifier.get(`${guild.ID}.channel`));
        if(!channel){
            client.db.notifier.delete(guild.ID)
            return console.log("[ERR] | Channel not found");
            }
        
             let msg;
        if(client.db.notifier.has(`${guild.ID}.message`)){
            msg = client.db.notifier.get(`${guild.ID}.message`)
        } else {
            msg = "<:youtube:684748153282625538> | Hey ! the youtuber **{youtuber.name}** just posted a new video! **{video.title}** \n {video.url} - posted the **{video.date}**"
        }

        let g = client.guilds.cache.get(guild.ID)

//console.log(video)
        msg = msg.replace("{youtuber.name}", video.author)
        .replace("{video.title}", video.title)
        .replace("{video.url}", video.link)
        .replace("{video.date}", formatDate(new Date(video.pubDate)))
        .replace("{emojis.youtube}", config.emojis.youtube)
        .replace("{guild.name}", g.name)
        .replace("{guild.id}", g.id)
      //  .replace("{guild.owner}", g.owner.displayName) REMOVED



        lastVideos[client.db.notifier.get(`${guild.ID}.youtuberid`)] = video;
        channel.send(msg, { disableMentions: "none", split: true })
        console.log("Notification sent !");
    });
}

async function check247() {

for (let i=0; i < client.radiomanager.all().length; i++){
    const out = client.radiomanager.all()[i].ID
    const guildid = out
    const channelid = client.radiomanager.get(`${out}.voicechannel`)
    const url = client.radiomanager.get(`${out}.url`)
    const title = client.radiomanager.get(`${out}.title`)

    if(!client.guilds.cache.get(guildid)) return;
    if(!client.channels.cache.get(channelid)) return client.radiomanager.delete(guildid);

    if(!client.guilds.cache.get(guildid).me.voice.channel){
        let connection = await client.channels.cache.get(channelid).join()
        connection.play(url)
    }

    if(!client.guilds.cache.get(guildid).me.voice.connection){
        let connection = await client.guilds.cache.get(guildid).me.voice.channel.join()
        connection.play(url, {
            volume: 1,
          })
    }

}

}

check247()

setInterval(async function notifier() {
client.user.setActivity(`YouTube Bot ⋄ ${client.prefix}help ⋄ Shard ${client.shard.ids[0] + 1}/${client.shard.count}`, { tyoe: "LISTENING" });

const guildsCounts = await client.shard.fetchClientValues("guilds.cache.size");
const guildsCount = guildsCounts.reduce((p, count) => p + count);
const usersCounts = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)');
const usersCount = usersCounts.reduce((p, count) => p + count);



if(client.channels.cache.get(config.stats_channels.shard)){
   var chann = client.channels.cache.get(config.stats_channels.shard)
   if(chann.name === `Shards • ${client.shard.count}`) return;
   chann.setName(`Shards • ${client.shard.count}`) 
}

if(client.channels.cache.get(config.stats_channels.users)){
    var chann = client.channels.cache.get(config.stats_channels.users)
    if(chann.name === `Users • ${usersCount}`) return;
    chann.setName(`Users • ${usersCount}`) 
 }

 if(client.channels.cache.get(config.stats_channels.guilds)){
    var chann = client.channels.cache.get(config.stats_channels.guilds)
    if(chann.name === `Servers • ${guildsCount}`) return;
    chann.setName(`Servers • ${guildsCount}`) 
 }







 check247()



}, 30 * 1000 * 60)

setInterval(async function ddfsf() {
check(client)
}, 5 * 1000 * 60)


}