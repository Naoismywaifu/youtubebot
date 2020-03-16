const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {

	const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

    const embed = new Discord.MessageEmbed()
    .setDescription("🐱🐱 Meow !!!")
    .setImage(file)
    .setColor("ORANGE")
	message.channel.send(embed);

}

module.exports.help = {
    name: "cat",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "cat",
    aliases: ["chat", "meow"],
    description: "MEOWWWWWW !!!!!"
    }
