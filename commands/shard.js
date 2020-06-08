const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
        name: 'shard',
        description: 'Show informations about shards of the bot.',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: ["shards"],
        async execute(client, message, args) {


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
.setDescription(message.language.get("SHARD_WHATS", guildsCount, usersCount))
results.forEach((shard) => {
        embed.addField(`<:online:653279333842157589> - Shard \`#${shard[2] + 1}\` ${client.shard.ids[0] === shard[2] ? `(\`${message.language.get("UTILS").CURRENT}\`)` : ""}`, `> ${message.language.get("UTILS").SERVERS}: \`${shard[1]}\`\n> ${message.language.get("UTILS").USER}: \`${shard[4]}\`\n> ${message.language.get("UTILS").CHANNELS}: \`${shard[5]}\`\n> RAM: \`${shard[0]} mb\`\n> Ping: \`${shard[3]} ms\`\n`, true);
    });
embed.setFooter("YouTube Bot")
embed.setColor("RED")
message.channel.send(embed)


},
}