const Discord = require('discord.js')
const config = require("../config.json")

module.exports = {
    name: 'userinfo',
    description: 'Get informations about the mentionned user or you',
    cooldown: 10,
    args: false,
    DJOnly: false,
    guildOnly: false,
    enabled: true,
    category: "Core",
    usage: '<@user#0000>',
    aliases: ["user-info", "infouser", "info-user", "ui"],
    execute(client, message, args) {

    let toFind = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const joined = new Intl.DateTimeFormat('en-US').format(toFind.joinedAt);


    // User variables
    const created = new Intl.DateTimeFormat('en-US').format(toFind.createdAt);

        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Informations about ${toFind.username}`)
        .setFooter(toFind.username, toFind.displayAvatarURL())
        .addField('Member information:', `> Display name: ${toFind.username}
        > Joined at: ${joined}`, true)

        .addField(message.language.get("USERINFO_USERINFO"), `> ID: ${toFind.id}
        > ${message.language.get("USERINFO_UNAME", toFind.username)}
        > ${message.language.get("USERINFO_TAG", toFind.tag)}
        > ${message.language.get("USERINFO_CREATEDAD", created)}
        > ${message.language.get("USERINFO_CMDS_EXECUTED", client.db.stats.get(`user_${message.author.id}`))}
        > ${message.language.get("USERINFO_PREMIUM_LICENCES", client.db.users.get(`${toFind.id}.premiums`)||"0")}`, true)
        .setThumbnail(toFind.displayAvatarURL())
        .setTimestamp()


    message.channel.send(embed)


  
}

}