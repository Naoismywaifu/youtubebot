const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: 'meme',
    description: 'Best memes of the world wide web !',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Core",
    usage: '',
    aliases: ["jokes"],
    async execute(client, message, args) {

        const subReddits = ["dankmeme", "meme", "me_irl"];

        const random = subReddits[Math.floor(Math.random() * subReddits.length)];


        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`${message.language.get("UTILS").FROM} /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
			.setFooter("YouTube Bot")

        message.channel.send(embed);
    },
}