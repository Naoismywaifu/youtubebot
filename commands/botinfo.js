const Discord = require("discord.js")
const config = require("../config.json")
const package = require("../package.json")
const os = require("os")

module.exports = {
        name: 'botinfo',
        description: 'Get informations about a bot',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: ["about", "botinfos", "bot-info", "info-bot", "infosbot", "bot-infos"],
        execute(client, message, args) {

            const promises = [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
                client.shard.fetchClientValues('channels.cache.size'),
                client.shard.broadcastEval('process.memoryUsage().heapUsed'),
                client.shard.fetchClientValues('queue.size'),

            ];
            
            Promise.all(promises)
                .then(results => {
                    const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                    const totalChannels = results[1].reduce((prev, channelCount) => prev + channelCount, 0);
                    const totalMembers = results[2].reduce((prev, memberCount) => prev + memberCount, 0);
                    const bruttotalRam = results[3].reduce((prev, ramcount) => prev + ramcount, 0);
                    const totalRam = (bruttotalRam / 1024 / 1024).toFixed(2);
                    const totalplaying = results[4].reduce((prev, playCount) => prev + playCount, 0);

                let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(message.language.get("BOTINFO_ABOUT"))
                .addField(message.language.get("BOTINFO_BOT_STATS"), `
                > ${message.language.get("BOTINFO_TOTAL_SERVERS")} ❱ \`${totalGuilds}\` ${message.language.get("UTILS").SERVERS}
                > ↳ ${message.language.get("BOTINFO_SHARD")} ❱ \`${client.guilds.cache.size}\` ${message.language.get("UTILS").SERVERS}
        
                > ${message.language.get("BOTINFO_TOTAL_USERS")} ❱ \`${totalMembers}\` ${message.language.get("UTILS").USERS}
                > ↳ ${message.language.get("BOTINFO_SHARD")} ❱ \`${client.users.cache.size}\` ${message.language.get("UTILS").USERS}

                > ${message.language.get("BOTINFO_PLAYING_COUNT")} ❱ \`${totalplaying}\` ${message.language.get("UTILS").SERVERS}
                > ↳ ${message.language.get("BOTINFO_SHARD")} ❱ \`${client.queue.size}\` ${message.language.get("UTILS").SERVERS}

                > ${message.language.get("BOTINFO_PREMIUM_COUNT")} ❱ \`${client.db.guildconf.all().filter(guild => guild.data.premium === true).length}\` ${message.language.get("UTILS").SERVERS}
                `, true)
                .addField(message.language.get("BOTINFO_SERVER_STATS"), `
                > ${message.language.get("BOTINFO_SHARD_NUMBER")} ❱ \`${client.shard.count}\` Shards
                > ↳ ${message.language.get("BOTINFO_SHARD_CURRENT")} ❱ \`#${client.shard.ids[0] + 1}\`
        
                > ${message.language.get("BOTINFO_OS")} ❱ \`${process.platform} Debian 10\`
                > ↳ ${message.language.get("BOTINFO_ARCH")} ❱ \`${os.arch}\`
        
                > ${message.language.get("BOTINFO_RAM")} ❱ \`${totalRam}\` MB
                > ↳ ${message.language.get("BOTINFO_SHARD")} ❱ \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`, true)
                .addField(message.language.get("BOTINFO_SOFTWARE_STATS"), `
                > ${message.language.get("BOTINFO_BOT_VERSION")} ❱ \`v${package.version}\`
                
                > ${message.language.get("BOTINFO_BOT_LIB")} ❱ \`Discord.js v${Discord.version}\`
        
                > ${message.language.get("BOTINFO_BOT_CORE")} ❱ \`Node.JS ${process.version}\`
                `, false)
        
        
            
            message.channel.send(embed)
        
        }).catch(console.error);

            }


        }