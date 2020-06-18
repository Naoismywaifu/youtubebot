const Discord = require("discord.js")
/**
 * 
 * @param {Discord.Message} message
 * @returns {Boolean} 
 */


async function TL(message) {
    let client = message.client;
    var dm;
    
    if(!message.guild){
        dm = true
    }

    let shardid = message.client.shard.ids[0]

if(!dm && !message.client.db.guildconf.get(`${message.guild.id}.telemetrics`)){
    const hook = new Discord.WebhookClient(message.client.config.webhook.id, message.client.config.webhook.token);

    var embed = new Discord.MessageEmbed()
    .setColor("ORANGE")
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle("YouTube Bot - Telemetrics Logger")
    .setDescription(`> ${message.author.tag} (id: ${message.author.id})
    Command:
    \`\`\`bash
    ${message.content}
    \`\`\`
    `)
    if(!dm){
    embed.addField("Guild infos", `> ${message.guild.name} (${message.guild.id})
    > SHARD ID: ${shardid}
    > Owner: ${message.guild.owner.user.tag} (id: ${message.guild.ownerID})
    > Created at: ${message.guild.createdAt}
    > icon: ${message.guild.iconURL({ dynamic:true })}
    `, true)
    embed.addField("Guild Config", `
\`\`\`asciidoc
langugage   ::      ${message.language.getFullLang()}
prefix      ::      ${client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix}
premium     ::      ${client.db.guildconf.get(`${message.guild.id}.premium`) ? message.language.get(`CONFIG_PREMIUM_TRUE`) : message.language.get(`CONFIG_PREMIUM_FALSE`)}
telemetrics ::      ${client.db.guildconf.get(`${message.guild.id}.telemetrics`) ? message.language.get(`CHECK_DISABLED`) : message.language.get(`CHECK_ENABLED`)}


= ${message.language.get("CONFIG_NOTIFIER")} =
youtuber      ::      ${client.db.notifier.get(`${message.guild.id}.youtuber`)||message.language.get("UTILS").UNDEFINED}
notif_channel ::      ${client.channels.cache.get(client.db.notifier.get(`${message.guild.id}.channel`)) ? client.channels.cache.get(client.db.notifier.get(`${message.guild.id}.channel`)).name : message.language.get("UTILS").UNDEFINED}
                    
= ${message.language.get("CONFIG_MUSIC")} =
music_compact_mode  ::      ${client.db.guildconf.get(`${message.guild.id}.compact`) ? message.language.get(`CHECK_ENABLED`) : message.language.get(`CHECK_DISABLED`)}
\`\`\`
`, false)
}
embed.setFooter("YouTube Bot - TL")
hook.send(embed)


} else {
    return false;
}

client.db.stats.add("global", 1)
client.db.stats.add(`user_${message.author.id}`, 1)
if(!dm){
client.db.stats.add(`guild_${message.guild.id}`, 1)
}

}

module.exports.TL = TL;
