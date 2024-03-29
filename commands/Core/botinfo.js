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
            this.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
            this.client.shard.fetchClientValues('channels.cache.size'),
            this.client.shard.broadcastEval(c => process.memoryUsage().heapUsed),
            //this.client.shard.fetchClientValues('player.manager.players.size'),

        ];

        let totalGuilds, totalMembers, totalChannels, bruttotalRam, totalRam, totalplaying = 0;

        
        Promise.all(promises)
            .then(results => {
                totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
                totalChannels = results[2].reduce((prev, channelCount) => prev + channelCount, 0);
                bruttotalRam = results[3].reduce((prev, ramcount) => prev + ramcount, 0);
                totalRam = (bruttotalRam / 1024 / 1024).toFixed(2);
                //totalplaying = results[4].reduce((prev, playCount) => prev + playCount, 0);
            })

                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(this.t("commands:Core.botinfo.about"))
                    .addField(this.t("commands:Core.botinfo.botInfo"), `
                > ${this.t("commands:Core.botinfo.TOTAL_SERVERS")} ❱ \`${totalGuilds||0}\` ${this.t("commands:servers")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.guilds.cache.size}\` ${this.t("commands:servers")}
        
                > ${this.t("commands:Core.botinfo.TOTAL_USERS")} ❱ \`${totalMembers||0}\` ${this.t("commands:users")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.users.cache.size}\` ${this.t("commands:users")}
                > ${this.t("commands:Core.botinfo.PLAYING_COUNT")} ❱ \`${totalplaying||0}\` ${this.t("commands:servers")}
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${this.client.player ? this.client.player.manager.players.size||"0" : "0"}\` ${this.t("commands:servers")}
                > ${this.t("commands:Core.botinfo.COMMANDS_EXECUTED")} ❱ \`${this.client.db.stats.get("global")||0}\`
                > ↳ ${this.t("commands:Core.botinfo.GUILD")} ❱ \`${this.client.db.stats.get(`guild_${message.guild.id}`)||0}\`
        
                > ${this.t("commands:Core.botinfo.PREMIUM_COUNT")} ❱ \`${this.client.db.guildconf.all().filter(guild => guild.data.premium === true).length}\` ${this.t("commands:servers")}
                `, true)
                    .addField(this.t("commands:Core.botinfo.ServInfo"), `
                > ${this.t("commands:Core.botinfo.SHARD_NUMBER")} ❱ \`${this.client.shard.count||0}\` Shards
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`#${this.client.shard.ids[0] + 1}\`
        
                > ${this.t("commands:Core.botinfo.OS")} ❱ \`${process.platform}\`
                > ↳ ${this.t("commands:Core.botinfo.ARCH")} ❱ \`${os.arch}\`
        
                > ${this.t("commands:Core.botinfo.RAM")} ❱ \`${totalRam||0}\` MB
                > ↳ ${this.t("commands:Core.botinfo.SHARD")} ❱ \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`, true)
                    .addField(this.t("commands:Core.botinfo.SoftInfo"), `
                > ${this.t("commands:Core.botinfo.BOT_VERSION")} ❱ \`v${version}\`
                
                > ${this.t("commands:Core.botinfo.BOT_LIB")} ❱ \`Discord.js v${DVer}\`
        
                > ${this.t("commands:Core.botinfo.BOT_CORE")} ❱ \`Node.JS ${process.version}\`
                `, false)



               return message.channel.send({embeds: [embed]})



    }

}

module.exports = BotInfo;