const Command = require("../../Base/Command");
const {MessageEmbed} = require("discord.js")
const fetch = require("node-fetch")

class Meme extends Command {

    constructor(client) {
        super(client, {
            name: "meme",
            aliases: ["memes", "dank"],
        });
        this.subreddit = [
            "memes",
            "dankmemes",
            "me_irl",
            "AdviceAnimals",
            "PrequelMemes",
            "terriblefacebookmemes",
            "PewdiepieSubmissions",
            "funny",
            "teenagers",
            "wholesomememes",
            "MemeEconomy"
        ]
    }

    async run(message, args) {

        let subReddit = await this.randomSubReddit()

        let embed = new MessageEmbed();
        fetch(`https://www.reddit.com/r/${subReddit}/random/.json`)
            .then(res => res.json())
            .then(res => {
                let [list] = res;
                let [post] = list.data.children;

                let permalink = post.data.permalink;
                let memeUrl = `https://reddit.com${permalink}`;
                let memeImage = post.data.url;
                let memeTitle = post.data.title;
                let memeUpvotes = post.data.ups;
                let memeNumComments = post.data.num_comments;

                embed.setTitle(memeTitle||"none");
                embed.setURL(memeUrl||null);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter(this.t("commands:Fun.meme.footer", {
                    upVotes: memeUpvotes||0,
                    comments: memeNumComments||0,
                    subreddit: subReddit||"none"
                }));

               return message.channel.send({embeds: [embed]});
            })
            .catch(console.error);
    }
    async randomSubReddit(){
        return this.subreddit[Math.floor(Math.random() * this.subreddit.length)];
    }
}

module.exports = Meme;