const Discord = require('discord.js')
const config = require("../config.json")
const package = require("../package.json")
const os = require("os")
exports.run = (client, message, args) => {

    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
        client.shard.fetchClientValues('channels.cache.size'),
        client.shard.broadcastEval('process.memoryUsage().heapUsed')
    ];
    
    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
            const totalChannels = results[1].reduce((prev, channelCount) => prev + channelCount, 0);
            const totalMembers = results[2].reduce((prev, memberCount) => prev + memberCount, 0);
            const bruttotalRam = results[3].reduce((prev, ramcount) => prev + ramcount, 0);
            const totalRam = (bruttotalRam / 1024 / 1024).toFixed(2);
        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Youtube bot is a Discord Bot developed with ❤ By Nao\nif you enjoy the bot you can vote for it be executing the command yt*vote and voting")
        .addField(`<:bot:653279330021015562> Bot's Statistics`, `
        > Total of servers ❱ \`${totalGuilds}\` servers
        > ↳ shard ❱ \`${client.guilds.cache.size}\` servers

        > Total of members ❱ \`${totalMembers}\` users
        > ↳ shard ❱ \`${client.users.cache.size}\` users
        `, true)
        .addField(`<:computer:653279331564650496> Server's Statistics`, `
        > Shards  ❱ \`${config.shards}\` Shards
        > ↳ Server Shard ❱ \`#${client.shard.ids[0] + 1}\`

        > OS ❱ \`${process.platform} Debian 10\`
        > ↳ Arch ❱ \`${os.arch}\`

        > RAM usage ❱ \`${totalRam}\` MB
        > ↳ Shard ❱ \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`, true)
        .addField(`<:youtubebot:653322797421953047> Software informations`, `
        > YouTube Bot ❱ \`v${package.version}\`
        
        > Bot's Library ❱ \`Discord.js v${Discord.version}\`

        > Core version ❱ \`Node.JS ${process.version}\`
        `, false)
        .addField(`Vote for the bot or become patreon to support the bot and get some features in plus !`, config.footer)

/*
        > Total of servers
        » \`${totalGuilds}\` servers
        > Shard's count of servers
        » \`${client.guilds.cache.size}\` servers
        > Total of members
        » \`${totalMembers}\` users
        > Shard's count of users
        » \`${client.users.cache.size}\` users
        `, true)
        .addField(`<:computer:653279331564650496> Server's Statistics`, `
        > Shards
        » \`${config.shards}\` Shards
        > Server Shard
        » Shard \`#${client.shard.ids[0] + 1}\`
        > Server's Operating System
        » \`${process.platform}\`
        > RAM usage
        » \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB
        */

    
    message.channel.send(embed)

}).catch(console.error);
  
}

    module.exports.help = {
        name: "botinfo",
        group: "Core",
        botperms: [],
        usrperm: [],
        guildonly: false,
        cooldown: 5,
        owneronly: false,
        aliases: ["info-bot", "bot-info", "binfo"],
        description: "Get some informations about the bot."
        }