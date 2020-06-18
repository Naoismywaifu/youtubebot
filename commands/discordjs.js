

const  Discord = require("discord.js")
const conf = require("../config.json")
const fetch = require("node-fetch");

module.exports = {
    name: 'discordjs',
    description: 'search things on the discordjs doc.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: true,
    args: true,
    enabled: true,
    category: "Owner",
    usage: '<query> <branch>',
    aliases: ["djs"],
    async execute(client, message, args) {


        let query = args[0];
        let branch = args[1] || "stable";
        let response = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${query}`)
        let json = await response.json();
        if (json == null) return message.reply("not found!");
        return message.channel.send({ embed: json })



}

}