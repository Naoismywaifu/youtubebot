const Discord = require("discord.js");
const randomPuppy = require("random-puppy");


module.exports.run = async (client, message, args) => {

        const subReddits = ["dankmeme", "meme", "me_irl"];

        const random = subReddits[Math.floor(Math.random() * subReddits.length)];


        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
			.setFooter("YouTube Bot")

        message.channel.send(embed);
    }
module.exports.help = {
    name: "meme",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "meme",
    aliases: ["memes"],
    description: "best memes of the world wide web !"
    }