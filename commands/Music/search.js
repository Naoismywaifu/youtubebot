const Command = require("../../Base/Command");
const yts = require("yt-search");

class Search extends Command {

    constructor(client) {
        super(client, {
            name: "search",
            guildOnly: true,
            DJOnly: true,
            aliases: [],
        });
    }

    async run(message, args) {
        if (args.length == 0)
            return message.channel.send(this.t("commands:Music.search.noArgs"))

        const term = args.join(' ');
        const results = await yts(term);
        let videos
        if(this.client.functions.isGuildPremium(message.guild.id))
                videos = results.videos.slice(0, 25)
            else
                videos = results.videos.slice(0, 10);

            function filter(msg) {
                const pattern = /(^[1-9][0-9]?$)/g;
                return pattern.test(msg.content)  && !msg.bot && parseInt(msg.content.match(pattern)[0]) <= this.client.functions.isGuildPremium(msg.guild.id) ? 25 : 10;
            }

        let resp = '```ml\n';
        for (let i = 0; i < videos.length; i++) {
            if (videos[i] != undefined) {
                resp += `${i + 1}) ${videos[i].title} \n`;
            }
        }
        resp += `\n\t${this.t("commands:Music.search.picknb", {
            max: videos.length
        })}\n`;
        if(!this.client.functions.isGuildPremium(message.guild.id))
            resp+=this.t("commands:Music.search.PremiumInfo")
        resp += '```';
        await message.channel.send(resp);

        message.channel.awaitMessages({filter, max: 1, time: 60000, errors: ['time'] }).then((collected) => {
            console.log(collected.first().content)
            console.log("fgdf")
            if (!isNaN(collected.first().content)) {
                console.log("jaja")
                message.channel.send(this.t("commands:Music.search.success"))
                this.client.getCommand("play").run(message, [`${videos[collected.first().content - 1].url}`]);
            } else if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send(this.t("commands:Music.search.cancelled"));
            }
        }).catch(() => {
                message.channel.send(this.t("commands:Music.search.noTime"));
            });
    }



}

module.exports = Search;