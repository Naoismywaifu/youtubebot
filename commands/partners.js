let partners = require("../assets/partners.json");
const Discord = require('discord.js');

module.exports = {
    name: 'partners',
    description: 'We loves projects and you love our project so there is a list of project who we supporting !',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Core",
    usage: '',
    aliases: ["partenaires"],
    execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
    .setTitle(" Youtube bot - Partners")
    .setDescription(message.language.get("PARTNERS_DESC"))
    partners.forEach(p => {
        if(p.LBU === "true"){
            var name = `🌟 - ${p.name}`
        } else {
            var name = p.name
        }

        embed.addField(name, `__${message.language.get("UTILS").DESCRIPTION}__ **-** ${p.Description}\n__${message.language.get("UTILS").TYPE}__ **-** ${p.Type}\n__${message.language.get("UTILS").LINKS}__ **-** ${p.links}`, false);

    });

message.channel.send(embed)

}
}
