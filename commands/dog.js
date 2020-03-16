const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {

	const { url } = await fetch('https://random.dog/woof.json').then(response => response.json());
        const embed = new Discord.MessageEmbed()
        .setDescription("🐶 OUAFFF !!!")
        .setImage(url)
        .setColor("ORANGE")
        message.channel.send(embed);


///
}

module.exports.help = {
    name: "dog",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "dog",
    aliases: ["chien", "ouaf"],
    description: "OUAF !!!!!"
    }
