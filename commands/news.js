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
    .setDescription("Every version take a lot of time to be developed but all versions are awesome !")
    .setColor("ORANGE")
    news.forEach(p => {
        if(p.version === version){
            var ver = `(\`Current\`) ${p.version}`
        } else {
            var ver = p.version
        }

        embed.addField(p.CodeName , `__Version__ **-** ${ver}\n__Description__ **-** ${p.Description}\n__Adding__ **-** ${p.adding}\nadded the: ${p.date}`, false);

    });

message.channel.send(embed)

}
}