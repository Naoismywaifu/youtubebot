const Discord = require("discord.js")

module.exports = {
        name: 'config',
        description: 'Edit the guild configuration: prefix, youtube notifications channel, etc... ?',
        cooldown: 5,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        enabled: true,
        staffOnly: true,
        category: "Core",
        usage: '<set/reset>',
        aliases: ["conf"],
        async execute(client, message, args) {

            switch (args[0]) {            
                case "set":
    if(!args[1]) return message.channel.send(message.language.get("CONFIG_NO_INPUT"))

    switch (args[1]) {
        case "language":
            if(args[2]){

            switch (args[2]) {
                case "french":
                    client.db.guildconf.set(`${message.guild.id}.language`, "french")
                    return message.channel.send(message.language.get("CONFIG_SUCCESS_LANGUAGE", "Français"))
                    break;
                case "english":
                    client.db.guildconf.set(`${message.guild.id}.language`, "english")
                    return message.channel.send(message.language.get("CONFIG_SUCCESS_LANGUAGE", "English"))
                    break;
            
                default:
                    return message.channel.send(message.language.get("CONFIG_INVALID_LANG"))
                    break;
            }
            } else {
                return message.channel.send(message.language.get("CONFIG_INVALID_LANG"))
            }
            
            break;
            case "prefix":
            if(!args[2]) return message.channel.send(message.language.get("CONFIG_PREFIX_UNDEFINED")) 
            if(args[2].length > 3) return message.channel.send(message.language.get("CONFIG_PREFIX_TOOLONG"))

            client.db.guildconf.set(`${message.guild.id}.prefix`, args[2])
            return message.channel.send(message.language.get("CONFIG_PREFIX_SUCCESS", args[2]))
            break;

            case "premium":
                if(client.db.guildconf.get(`${message.guild.id}.premium`)){
            return message.channel.send(message.language.get("CONFIG_PREMIUM_ALREADY"))
                } else {
            return message.channel.send(message.language.get("CONFIG_PREMIUM_NEED"))
                }
            break;


        case "telemetrics":
            if(client.db.guildconf.get(`${message.guild.id}.telemetrics`)){
            client.db.guildconf.delete(`${message.guild.id}.telemetrics`)
            return message.channel.send(message.language.get("CONFIG_TELEMETRICS_ENABLED"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.telemetrics`, true)
                return message.channel.send(message.language.get("CONFIG_TELEMETRICS_DISABLED"))
            }
        break;

        case "youtuber":
        return message.channel.send(message.language.get("CONFIG_NOTIFIER_CMD"))
        break;

        case "notif_channel":
            return message.channel.send(message.language.get("CONFIG_NOTIFIER_CMD"))
            break;

        case "music_compact_mode":
            if(client.db.guildconf.get(`${message.guild.id}.compact`)){
                client.db.guildconf.delete(`${message.guild.id}.compact`)
                return message.channel.send(message.language.get("CONFIG_COMPACT_DISABLED"))
            } else {
                    client.db.guildconf.set(`${message.guild.id}.compact`, true)
                    return message.channel.send(message.language.get("CONFIG_COMPACT_ENABLED"))
            }
            break;
        case "bassboost":
            var amt;
            switch (args[2]) {
                case "off":
                    amt = 0;
                    if(client.db.guildconf.has(`${message.guild.id}.bassboost`)){
                    client.db.guildconf.delete(`${message.guild.id}.bassboost`)
                    }
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[2]));
                    break;
                case "low":
                    amt = 5;
                    client.db.guildconf.set(`${message.guild.id}.bassboost`, amt)
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[2]));
                    break;
                case "medium":
                    amt = 10;
                    client.db.guildconf.set(`${message.guild.id}.bassboost`, amt)
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[2]));
                    break;
                case "high":
                    amt = 15;
                    client.db.guildconf.set(`${message.guild.id}.bassboost`, amt)
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[2]));
                    break;
                case "hard":
                    amt = 20;
                    client.db.guildconf.set(`${message.guild.id}.bassboost`, amt)
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_SUCCESS", args[2]));
                    break;
                default:
                    return message.channel.send(message.language.get("CONFIG_BASSBOOST_OPTIONS"));
            }
            break;

        case "nightcore":
            if(client.db.guildconf.get(`${message.guild.id}.nightcore`)){
                client.db.guildconf.set(`${message.guild.id}.nightcore`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "nightcore"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.nightcore`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "nightcore"))
            }
        break;
        case "echo":
            if(client.db.guildconf.get(`${message.guild.id}.echo`)){
                client.db.guildconf.set(`${message.guild.id}.echo`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "echo"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.echo`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "echo"))
            }
        break;
        case "vaporwave":
            if(client.db.guildconf.get(`${message.guild.id}.vaporwave`)){
                client.db.guildconf.set(`${message.guild.id}.vaporwave`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "ｖａｐｏｒｗａｖｅ"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.vaporwave`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "ｖａｐｏｒｗａｖｅ"))
            }
        break;
        case "8D":
            if(client.db.guildconf.get(`${message.guild.id}.8d`)){
                client.db.guildconf.set(`${message.guild.id}.8d`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "8D"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.8d`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "8D"))
            }
        break;
        case "reverse":
            if(client.db.guildconf.get(`${message.guild.id}.reverse`)){
                client.db.guildconf.set(`${message.guild.id}.reverse`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "reverse"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.reverse`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", "reverse"))
            }
        break;
        case "normalizer":
            if(client.db.guildconf.get(`${message.guild.id}.normalizer`)){
                client.db.guildconf.set(`${message.guild.id}.normalizer`, false)
                message.channel.send(message.language.get("CONFIG_MUSIC_DISABLED", "normalizer"))
            } else {
                client.db.guildconf.set(`${message.guild.id}.normalizer`, true)
                message.channel.send(message.language.get("CONFIG_MUSIC_ENABLED", 'normalizer'))
            }
        break;
        case "djrole":
            let djrole = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])

            if(!djrole) return message.channel.send(message.language.get("CONFIG_NOMENTION"))
            client.db.guildconf.set(`${message.guild.id}.djrole`, djrole.id)
            return message.channel.send(message.language.get("CONFIG_DJROLE_SUCCESS"))
        break;
        case "staffrole":
            let staffrole = message.mentions.roles.first() || message.guild.roles.cache.fetch(args[2])

            if(!staffrole) return message.channel.send(message.language.get("CONFIG_NOMENTION"))
            client.db.guildconf.set(`${message.guild.id}.staffrole`, staffrole.id)
            return message.channel.send(message.language.get("CONFIG_STAFFROLE_SUCCESS"))
        break;
    default:
    return message.channel.send(message.language.get("CONFIG_NO_INPUT"))
    break;
    }
                    break;
                case "reset":
                    if(!args[1]) return message.channel.send(message.language.get("CONFIG_NO_INPUT"))

                    switch (args[1]) {
                        case "language":
                            client.db.guildconf.delete(`${message.guild.id}.language`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "language"))

                            break;
                            case "prefix":
                                client.db.guildconf.delete(`${message.guild.id}.prefix`)
                                return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "prefix"))
                            break;
                
                            case "premium":
                                return message.channel.send(message.language.get("CONFIG_PREMIUM_NEED"))
                            break;
                
                
                        case "telemetrics":
                            client.db.guildconf.delete(`${message.guild.id}.telemetrics`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "telemetrics"))
                        break;
                
                        case "youtuber":
                        return message.channel.send(message.language.get("CONFIG_NOTIFIER_CMD"))
                        break;
                
                        case "notif_channel":
                            return message.channel.send(message.language.get("CONFIG_NOTIFIER_CMD"))
                            break;
                
                        case "music_compact_mode":
                            client.db.guildconf.delete(`${message.guild.id}.compact`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "Compact mode"))

                            break;
                        case "bassboost":
                            client.db.guildconf.delete(`${message.guild.id}.bassboost`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "bassboost"))

                            break;
                
                        case "nightcore":
                            client.db.guildconf.delete(`${message.guild.id}.nightcore`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "nightcore"))

                        break;
                        case "echo":
                            client.db.guildconf.delete(`${message.guild.id}.echo`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "echo"))

                        break;
                        case "vaporwave":
                            client.db.guildconf.delete(`${message.guild.id}.vaporwave`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "ｖａｐｏｒｗａｖｅ"))

                        break;
                        case "8D":
                            client.db.guildconf.delete(`${message.guild.id}.8d`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "8D"))

                        break;
                        case "reverse":
                            client.db.guildconf.delete(`${message.guild.id}.reverse`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "reverse"))

                        break;
                        case "normalizer":
                            client.db.guildconf.delete(`${message.guild.id}.normalizer`)
                            return message.channel.send(message.language.get("CONFIG_RESET_SUCCESS", "normalizer"))

                        break;
                default:
                    message.channel.send(message.language.get("CONFIG_INVALID_LANG"))
                    break;
                    }
                    break;
                    
                    default:

var bassbooststatus;
switch (client.db.guildconf.get(`${message.guild.id}.bassboost`)||0) {
    case 0:
        bassbooststatus = message.language.get(`CHECK_DISABLED`)
        break;
        case 5:
            bassbooststatus = "✔ | Low"
            break;
            case 10:
                bassbooststatus = "✔ | Medium"
                break;
                case 15:
                    bassbooststatus = "✔ | High"
                    break;
                    case 20:
                        bassbooststatus = "✔ | Hard"
                        break;
                
    default:
        bassbooststatus = message.language.get(`CHECK_DISABLED`)
        break;
}
                    var embed = new Discord.MessageEmbed()
                    .setDescription(`\`\`\`asciidoc
        = ${message.language.get("UTILS").SERVER_SETTINGS} =

= ${message.language.get("CONFIG_GLOBAL")} =
langugage   ::      ${message.language.getFullLang()}
prefix      ::      ${client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix}
premium     ::      ${client.db.guildconf.get(`${message.guild.id}.premium`) ? message.language.get(`CONFIG_PREMIUM_TRUE`) : message.language.get(`CONFIG_PREMIUM_FALSE`)}
telemetrics ::      ${client.db.guildconf.get(`${message.guild.id}.telemetrics`) ? message.language.get(`CHECK_DISABLED`) : message.language.get(`CHECK_ENABLED`)}
djrole      ::      ${client.db.guildconf.get(`${message.guild.id}.djrole`) ? "@" + message.guild.roles.cache.get(client.db.guildconf.get(`${message.guild.id}.djrole`)).name : message.language.get("CHECK_DISABLED")}
staffrole   ::      ${client.db.guildconf.get(`${message.guild.id}.staffrole`) ? "@" + message.guild.roles.cache.get(client.db.guildconf.get(`${message.guild.id}.staffrole`)).name : message.language.get("CHECK_DISABLED")}

= ${message.language.get("CONFIG_NOTIFIER")} =
youtuber      ::      ${client.db.notifier.get(`${message.guild.id}.youtuber`)||message.language.get("UTILS").UNDEFINED}
notif_channel ::      ${client.channels.cache.get(client.db.notifier.get(`${message.guild.id}.channel`)) ? client.channels.cache.get(client.db.notifier.get(`${message.guild.id}.channel`)).name : message.language.get("UTILS").UNDEFINED}
                    
= ${message.language.get("CONFIG_MUSIC")} =
music_compact_mode  ::      ${client.db.guildconf.get(`${message.guild.id}.compact`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}

nightcore           ::      ${client.db.guildconf.get(`${message.guild.id}.nightcore`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
bassboost           ::      ${bassbooststatus}
echo                ::      ${client.db.guildconf.get(`${message.guild.id}.echo`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
vaporwave           ::      ${client.db.guildconf.get(`${message.guild.id}.vaporwave`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
8D                  ::      ${client.db.guildconf.get(`${message.guild.id}.8d`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
reverse             ::      ${client.db.guildconf.get(`${message.guild.id}.reverse`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
normalizer          ::      ${client.db.guildconf.get(`${message.guild.id}.normalizer`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
\`\`\``)
await message.channel.send(embed);

                    break;
            }

            }


        }
    