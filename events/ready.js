const Discord = require("discord.js")
const config = require("../config.json")
const Parser = require("rss-parser");
const parser = new Parser();
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY_NOTIFIER);

exports.run = async (client) => {
	console.log(`${client.user.username} ready!`);
    client.user.setActivity(`YouTube Bot ⋄ ${client.prefix}help ⋄ Shard ${client.shard.ids[0] + 1}/${client.shard.count}`, { tyoe: "LISTENING" });
    
    setInterval(() => {
        dbl.postStats(client.guilds.cache.size, client.shard.ids[0], client.shard.count);
    }, 1800000);

const startAt = Date.now();
const lastVideos = {};


function formatDate(date) {
    let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
    return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
}


async function getLastVideo(youtubeChannelName, rssURL){
    console.log(`[${youtubeChannelName}]  | Getting videos...`);
    let content = await parser.parseURL(rssURL);
    console.log(`[${youtubeChannelName}]  | ${content.items.length} videos found`);
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
    // If the last video is the same as the last saved, return
    if(lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return console.log(`[${youtubeChannelName}] | Last video is the same as the last saved`);
    return lastVideo;
}

/**
 * Get the youtube channel id from an url
 * @param {string} url The URL of the youtube channel
 * @returns The channel ID || null
 */
function getYoutubeChannelIdFromURL(url) {
    let id = null;
    url = url.replace(/(>|<)/gi, "").split(/(\/channel\/|\/user\/)/);
    if(url[2]) {
      id = url[2].split(/[^0-9a-z_-]/i)[0];
    }
    return id;
}

/**
 * Get infos for a youtube channel
 * @param {string} name The name of the youtube channel or an url
 * @returns The channel info || null
 */
async function getYoutubeChannelInfos(name){
    console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Resolving channel infos...`);
    let channel = null;
    /* Try to search by ID */
    let id = getYoutubeChannelIdFromURL(name);
    if(id){
        channel = await youtube.getChannelByID(id);
    }
    if(!channel){
        /* Try to search by name */
        let channels = await youtube.searchChannels(name);
        if(channels.length > 0){
            channel = channels[0];
        }
    }
    console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Title of the resolved channel: ${channel.raw ? channel.raw.snippet.title : "err"}`);
    return channel;
}

/**
 * Check for new videos
 */
async function check(client){
    console.log("Checking...");
    client.db.notifier.all().forEach(async (guild) => {
        if(!client.guilds.cache.get(guild.ID)) return;
        var youtuber = client.db.notifier.fetch(`${guild.ID}.youtuber`)
        if(!youtuber) return client.db.notifier.delete(guild.ID);
        console.log(`[${youtuber.length >= 10 ? youtuber.slice(0, 10)+"..." : youtuber}] | Start checking...`);
        let channelInfos = await getYoutubeChannelInfos(youtuber);
        if(!channelInfos) return console.log("[ERR] | Invalid youtuber provided: "+youtuber);
        let video = await checkVideos(channelInfos.raw.snippet.title, "https://www.youtube.com/feeds/videos.xml?channel_id="+channelInfos.id);
        if(!video) return console.log(`[${channelInfos.raw.snippet.title}] | No notification`);
        let channel = client.channels.cache.get(client.db.notifier.get(`${guild.ID}.channel`));
        if(!channel) return console.log("[ERR] | Channel not found");
        channel.send(`<:youtube:684748153282625538> | Hey ! the youtuber **${video.author}** just posted a new video! **${video.title}** \n ${video.link} - posted the **${formatDate(new Date(video.pubDate))}**`)
        console.log("Notification sent !");
        lastVideos[channelInfos.raw.snippet.title] = video;
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
check(client)
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

 if(client.channels.cache.get(config.stats_channels.guilds)){
    var chann = client.channels.cache.get(config.stats_channels.members)
    if(chann.name === `Members • ${chann.guild.memberCount}`) return;
    chann.setName(`Members • ${chann.guild.memberCount}`) 
 }





 check247()



}, 30 * 1000 * 60)
}