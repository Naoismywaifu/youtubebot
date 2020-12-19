const Command = require("../../Base/Command");
Youtube = require("simple-youtube-api");

class Notify extends Command {


    constructor(client) {
        super(client, {
            name: "notify",
            StaffOnly: true,
            guildOnly: true,
            aliases: ["notifier"],
        });
    }

    async run(message, args) {
        if(!args[0] && !message.mentions.channels.first()) return message.channel.send(this.t("commands:Notifier.notify.invalidChannel"))
        if(!this.client.channels.cache.get(args[0]) && !message.mentions.channels.first())
            return message.channel.send(this.t("commands:Notifier.notify.invalidChannel"))



        if(!args[1])
            return message.channel.send(this.t("commands:Notifier.notify.invalidChannel"))

        let youtube = new Youtube(this.client.config.YTAPIKEY);


        let m = await message.channel.send(this.t("commands:Notifier.notify.searching"))
            this.getYoutubeChannelInfos(youtube, args.slice(1).join(" ")).then((out) => {
                let channelID;
                console.log(out)
                if(!out)
                    return m.edit(this.t("commands:Notifier.notify.notFound"))

                    m.edit(this.t("commands:Notifier.notify.success"))

                    if(message.mentions.channels.first()){
                        channelID = message.mentions.channels.first().id;
                    } else {
                        channelID = this.client.channels.cache.get(args[0]).id;
                    }


                    this.client.db.notifier.set(`${message.guild.id}.channelid`, out.id)
                    this.client.db.notifier.set(`${message.guild.id}.channel`, channelID)
                    this.client.db.notifier.set(`${message.guild.id}.youtuber`, out.title)



            })
        }

    async getYoutubeChannelInfos(youtube, name){
        let channels = await youtube.searchChannels(name, 1)
        if(channels.length > 0){
            let out = {
                title: channels[0].raw.snippet.title,
                id: channels[0].id
            }
            return out;
        } else {
            return false;
        }

    }

}

module.exports = Notify;