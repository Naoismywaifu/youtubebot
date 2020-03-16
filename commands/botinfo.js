const Discord = require('discord.js')
const config = require("../config.json")

exports.run = (client, message, args) => {

    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
    ];
    
    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
            const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
		//	const totalRam results[2].reduce((prev, ramCount) => prev + ramCount, 0);
		
        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Youtube bot is a Discord Bot developed with ❤ By HiiZun")
        .addField(`<:bot:653279330021015562> Bot's Statistics`, `
        > Total servers
        » \`${totalGuilds}\` servers
        > Shard's server
        » \`${client.guilds.cache.size}\` servers
        > Total users
        » \`${totalMembers}\` users
        > Shard's users
        » \`${client.users.cache.size}\` users
        `, true)
        .addField(`<:computer:653279331564650496> Server's Statistics`, `
        > Shards
        » \`${client.shard.count}\` Shards
        > Server Shard
        » Shard \`#${client.shard.ids[0] + 1}\`
        > Server's Operating System
        » \`${process.platform}\`
        `, true)
        .addField(`<:computer:653279331564650496> Server's Statistics`, `
        > Bot's Library
        » Discord.js \`${Discord.version}\`
        > Core version
        » \`Node.JS ${process.version}\`
        `, false)


    
    message.channel.send(embed)

}).catch(console.error);
  
}

    module.exports.help = {
        name: "botinfo",
        group: "Core",
        botperms: [],
        usrperm: [],
        owneronly: false,
        aliases: ["info-bot", "bot-info", "binfo"],
        description: "Get some informations about the bot."
        }