const Discord = require('discord.js')
const config = require("../config.json")

exports.run = (client, message, args) => {

    let toFind = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const joined = new Intl.DateTimeFormat('en-US').format(toFind.joinedAt);


    // User variables
    const created = new Intl.DateTimeFormat('en-US').format(toFind.createdAt);

        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Informations about ${toFind.username}`)
        .setFooter(toFind.username, toFind.displayAvatarURL)
        .addField('Member information:', `**> Display name:** ${toFind.username}
        **> Joined at:** ${joined}`, true)

        .addField('User information:', `**> ID:** ${toFind.id}
        **> Username**: ${toFind.username}
        **> Tag**: ${toFind.tag}
        **> Created at**: ${created}`, true)
        .setThumbnail(toFind.displayAvatarURL)
        .setTimestamp()

    if (toFind.presence.game) 
        embed.addField('Currently playing', `**> Name:** ${toFind.presence.game.name}`);
    
    message.channel.send(embed)


  
}

    module.exports.help = {
        name: "userinfo",
        group: "Core",
        botperms: [],
        usrperm: [],
        owneronly: false,
        aliases: ["info-user", "user-info", "uinfo", "whois", "who"],
        description: "Get some informations about you or someone."
        }