let news = require("../assets/news.json");
let { version } = require("../package.json")
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

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

module.exports.help = {
    name: "news",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "news",
    aliases: ["nouvelles", "nouvautés"],
    description: "What's new in YouTube Bot ? "
    }