const Discord = require('discord.js')
const config = require("../config.json")
const { premium } = require("../premium")

exports.run = async (client, message, args) => {


    const guildsCounts = await client.shard.fetchClientValues("guilds.cache.size");
    const guildsCount = guildsCounts.reduce((p, count) => p + count);
    const usersCounts = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)');
    const usersCount = usersCounts.reduce((p, count) => p + count);


    const results = await client.shard.broadcastEval(() => {
        return [
            Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
            this.guilds.cache.size,
            this.shard.ids[0],
            Math.round(this.ws.ping),
            this.users.cache.size,
            this.channels.cache.size
        ];
    });
const embed = new Discord.MessageEmbed()
.setTitle("Shard - Youtube bot")
.setDescription(`**YouTube Bot work with shards, shards are instances of YouTube Bot started at the same time which share the heavy task of offering you the best possible sound !**\n__Global stats:__\n> \`${guildsCount} servers\`\n> \`${usersCount} users\``)
results.forEach((shard) => {
        embed.addField(`<:online:653279333842157589> - Shard \`#${shard[2] + 1}\` ${client.shard.ids[0] === shard[2] ? '(\`Current\`)' : ""}`, `> Servers: \`${shard[1]}\`\n> Users: \`${shard[4]}\`\n> Channels: \`${shard[5]}\`\n> RAM: \`${shard[0]} mb\`\n> Ping: \`${shard[3]} ms\`\n`, true);
    });
embed.setFooter("YouTube Bot")
embed.setColor("RED")
message.channel.send(embed)


}

    module.exports.help = {
        name: "shard",
        group: "Core",
        botperms: [],
        usrperm: [],
        owneronly: false,
        aliases: ["shards", "shard-info", "shards-info"],
        description: "get informations about the current shard"
        

    
    }