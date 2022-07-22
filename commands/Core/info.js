const Command = require("../../Base/Command");
const {MessageEmbed} = require("discord.js")
const { version } = require("../../package.json")

class Info extends Command {

    constructor(client) {
        super(client, {
            name: "info",
            aliases: [],
        });

    }

    async run(message, args) {



        const promises = [
            await this.client.shard.fetchClientValues('guilds.cache.size'),
            await this.client.shard.broadcastEval(c => c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)),
        ];

        Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);



                let embed = new MessageEmbed()
                    .setTitle("Info - YouTube Bot")
                    .setDescription(this.t("commands:Core.info.infoDesc", {
                        version,
                        shardID: this.client.shard.ids[0],
                        shardCount: this.client.shard.count,
                        totalGuilds,
                        totalMembers
                    }))
                    .setFooter("Youtube Bot", this.client.user.displayAvatarURL())
                    .setColor("ORANGE")
                return message.channel.send({embeds: [embed]})

            })
            .catch(console.error);

    }

}

module.exports = Info;