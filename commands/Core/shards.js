const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Shards extends Command {

    constructor(client) {
        super(client, {
            name: "shards",
            aliases: ["shard"],
        });

    }

    async run(message, args) {


        const guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        const guildsCount = guildsCounts.reduce((p, count) => p + count);
        const usersCounts = await this.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)');
        const usersCount = usersCounts.reduce((p, count) => p + count);


        const results = await this.client.shard.broadcastEval(() => {
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
            .setDescription(this.t("commands:Core.shards.shardInfo", {
                allServers: guildsCount,
                allMembers: usersCount
            }))
        results.forEach((shard) => {
            embed.addField(`<:check:719323012972675093> - Shard \`#${shard[2] + 1}\` ${this.client.shard.ids[0] === shard[2] ? `(\`${this.t("commands:current")}\`)` : ""}`, `> ${this.t("commands:servers")}: \`${shard[1]}\`\n> ${this.t("commands:users")}: \`${shard[4]}\`\n> ${this.t("commands:channels")}: \`${shard[5]}\`\n> ${this.t("commands:ram")}: \`${shard[0]} mb\`\n> ${this.t("commands:ping")}: \`${shard[3]} ms\`\n`, true);
        });
        embed.setFooter("YouTube Bot", this.client.user.displayAvatarURL())
        embed.setColor("RED")
        return message.channel.send(embed)

    }

}

module.exports = Shards;