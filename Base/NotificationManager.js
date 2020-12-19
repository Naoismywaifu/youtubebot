const Parser = require("rss-parser");
const parser = new Parser();
const Youtube = require("simple-youtube-api");

class NotificationManager {
    constructor(client)
    {
        this.client = client
        this.youtube = new Youtube(this.client.config.YTAPIKEY);
        this.startAt = this.client.readyTimestamp;
        this.lastVideos = {};

        this.client.setInterval(() => {
            this.check(this.client)
        }, 5*60*1000)
    }


    formatDate(date)
    {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
        return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
    }


   async getLastVideo(youtubeChannelName, rssURL)
    {
        let content = await parser.parseURL(rssURL);
        let tLastVideos = content.items.sort((a, b) => {
            let aPubDate = new Date(a.pubDate || 0).getTime();
            let bPubDate = new Date(b.pubDate || 0).getTime();
            return bPubDate - aPubDate;
        });
        this.client.logger.log(`[${youtubeChannelName}]  | The last video is "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`, "debug");
        return tLastVideos[0];
    }

    async checkVideos(youtubeChannelName, rssURL)
    {
        this.client.logger.log(`[${youtubeChannelName}] | Get the last video..`, "debug");
        let lastVideo = await this.getLastVideo(youtubeChannelName, rssURL);
        // If there isn't any video in the youtube channel, return
        if(!lastVideo) return this.client.logger.log("[ERR] | No video found for "+lastVideo, "debug");
        // If the date of the last uploaded video is older than the date of the bot starts, return


        let TimeStamp = await new Date(lastVideo.pubDate).getTime()

        if(TimeStamp < this.startAt) return this.client.logger.log(`[${youtubeChannelName}] | Last video was uploaded before the bot starts`, 'debug');

        let lastSavedVideo = this.lastVideos[youtubeChannelName];


        // If the last video is the same as the last saved, return
        if(lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return this.client.logger.log(`[${youtubeChannelName}] | Last video is the same as the last saved`, "debug");

        return lastVideo;
    }


    async getYoutubeChannelInfos(name) {
        let channel = null;

        let channels = await this.youtube.searchChannels(name, 2);
        if (channels.length > 0) {
            channel = channels[0];
        }

        return channel;
    }

    async check(client)
    {
        for (const guild of client.db.notifier.all()) {

            if(!client.guilds.cache.get(guild.ID)) continue;
            if(!client.db.notifier.get(`${guild.ID}.youtuber`)) continue;
            if(!client.db.notifier.get(`${guild.ID}.channel`)) continue;
            if(!client.db.notifier.get(`${guild.ID}.youtuberid`)){
                try {
                    let ch = await this.getYoutubeChannelInfos(client.db.notifier.get(`${guild.ID}.youtuber`))
                    if(!ch) {
                        this.client.logger.log("channel not found", "debug")
                        continue;
                    }


                    client.db.notifier.set(`${guild.ID}.youtuberid`, ch.id || null)
                } catch (e) {
                    client.logger.log(e.message, 'error')
                    continue;
                }
            }

            let youtuber = client.db.notifier.fetch(`${guild.ID}.youtuber`)
            if(!youtuber) client.db.notifier.delete(guild.ID);


            let video = await this.checkVideos(client.db.notifier.get(`${guild.ID}.youtuberid`), "https://www.youtube.com/feeds/videos.xml?channel_id="+client.db.notifier.get(`${guild.ID}.youtuberid`));
            if(!video) {
                this.client.logger.log(`No notification`, "debug");
                continue;
            }
            let channel = client.channels.cache.get(client.db.notifier.get(`${guild.ID}.channel`));
            if(!channel){
                client.db.notifier.delete(guild.ID)
                this.client.logger.log("[ERR] | Channel not found", "debug");
            }


            let msg;
            if(client.db.notifier.has(`${guild.ID}.message`)){
                msg = client.db.notifier.get(`${guild.ID}.message`)
            } else {
                msg = "<:youtube:719953503833030797> | Hey! **{youtuber.name}** just posted a new video! **{video.title}**\n {video.url} - posted the **{video.date}**"
            }

            let g = client.guilds.cache.get(guild.ID)

            msg = msg
                .replace("{youtuber.name}", video.author||"HiiZun")
                .replace("{video.title}", video.title||"Unable to fetch")
                .replace("{video.url}", video.link||"Unable to fetch")
                .replace("{video.date}", this.formatDate(new Date(video.pubDate||0)))
                .replace("{emojis.youtube}", this.client.config.EMOJIS.youtube||"😀")
                .replace("{guild.name}", g.name||"Unable to fetch")
                .replace("{guild.id}", g.id||"Unable to fetch")

            this.lastVideos[this.client.db.notifier.get(`${guild.ID}.youtuberid`)] = video;
            channel.send(msg, { disableMentions: "none", split: true })
            client.logger.log("Notification sent !", "debug");
        }
    }





}
module.exports = NotificationManager;