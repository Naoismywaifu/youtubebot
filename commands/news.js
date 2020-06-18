let news = require("../assets/news.json");
let { version } = require("../package.json")
const Discord = require('discord.js');

module.exports = {
        name: 'news',
        description: "What's new on YouTube Bot.",
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: [],
        execute(client, message, args) {


    let embed = new Discord.MessageEmbed()
    .setTitle("Youtube bot - News")
    .setDescription(message.language.get("NEWS_DESC"))
    .setColor("ORANGE")
    news.forEach(p => {
        if(p.version === version){
            var ver = `(\`${message.language.get('UTILS').CURRENT}\`) ${p.version}`
        } else {
            var ver = p.version
        }

        embed.addField(p.CodeName , `__${message.language.get("UTILS").VERSION}__ **-** ${ver}\n__${message.language.get("UTILS").DESCRIPTION}__ **-** ${p.Description}\n__${message.language.get("UTILS").ADDING}__ **-** ${p.adding}\nadded the: ${p.date}`, false);

    });

message.channel.send(embed)

}
}