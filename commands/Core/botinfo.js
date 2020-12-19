const Command = require("../../Base/Command");
const {MessageEmbed, version:DVer } = require("discord.js")
const { version } = require("../../package.json")
const os = require("os")

class BotInfo extends Command {

    constructor(client) {
        super(client, {
            name: "botinfo",
            guildOnly: true,
            aliases: ["about", "botinfos", "bot-info", "info-bot", "infosbot", "bot-infos"],
        });

    }

    async run(message, args) {


        const promises = [
            this.client.shard.fetchClientValues('guilds.cache.size'),
            this.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
            this.client.shard.fetchClientValues('channels.cache.size'),
            this.client.shard.broadcastEval('process.memoryUsage().heapUsed'),
            this.client.shard.fetchClientValues('player.queue.size'),

        ];
        Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
                const totalChannels = results[2].reduce((prev, channelCount) => prev + channelCount, 0);
                const bruttotalRam = results[3].reduce((prev, ramcount) => prev + ramcount, 0);
                const totalRam = (bruttotalRam / 1024 / 1024).toFixed(2);
                const totalplaying = results[4].reduce((prev, playCount) => prev + playCount, 0);

                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(this.t("commands:Core.botinfo.about"))
                    .addField(this.t("commands:Core.botinfo.botInfo"), `
                > ${this.t("commands:Core.botinfo.TOTAL_SERVERS")} ❱ \`${totalGuilds}\` ${this.t("commands:servers")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.guilds.cache.size}\` ${this.t("commands:servers")}
        
                > ${this.t("commands:Core.botinfo.TOTAL_USERS")} ❱ \`${totalMembers}\` ${this.t("commands:users")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.users.cache.size}\` ${this.t("commands:users")}
                > ${this.t("commands:Core.botinfo.PLAYING_COUNT")} ❱ \`${totalplaying}\` ${this.t("commands:servers")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.player.queue.size}\` ${this.t("commands:servers")}
                > ${this.t("commands:Core.botinfo.COMMANDS_EXECUTED")} ❱ \`${this.client.db.stats.get("global")||0}\`
                > ↳ ${this.t("commands:Core.botinfo.GUILD")} ❱ \`${this.client.db.stats.get(`guild_${message.guild.id}`)||0}\`
        
                > ${this.t("commands:Core.botinfo.PREMIUM_COUNT")} ❱ \`${this.client.db.guildconf.all().filter(guild => guild.data.premium === true).length}\` ${this.t("commands:servers")}
                `, true)
                    .addField(this.t("commands:Core.botinfo.ServInfo"), `
                > ${this.t("commands:Core.botinfo.SHARD_NUMBER")} ❱ \`${this.client.shard.count}\` Shards
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`#${this.client.shard.ids[0] + 1}\`
        
                > ${this.t("commands:Core.botinfo.OS")} ❱ \`${process.platform} Debian 10\`
                > ↳ ${this.t("commands:Core.botinfo.ARCH")} ❱ \`${os.arch}\`
        
                > ${this.t("commands:Core.botinfo.RAM")} ❱ \`${totalRam}\` MB
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`, true)
                    .addField(this.t("commands:Core.botinfo.SoftInfo"), `
                > ${this.t("commands:Core.botinfo.BOT_VERSION")} ❱ \`v${version}\`
                
                > ${this.t("commands:Core.botinfo.BOT_LIB")} ❱ \`Discord.js v${DVer}\`
        
                > ${this.t("commands:Core.botinfo.BOT_CORE")} ❱ \`Node.JS ${process.version}\`
                `, false)



               return message.channel.send(embed)

            }).catch(console.error);


    }

}

module.exports = BotInfo;