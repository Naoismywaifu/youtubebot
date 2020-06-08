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
    .setTitle("<:YouTubeBot:689789594496925736> Youtube bot - Partners")
    .setDescription("this is a list of project who they support us and we too !\n**projects with a 🌟 are projects who we love a lot**")
    partners.forEach(p => {
        if(p.LBU === "true"){
            var name = `🌟 - ${p.name}`
        } else {
            var name = p.name
        }

        embed.addField(name, `__Description__ **-** ${p.Description}\n__Type__ **-** ${p.Type}\n__Links__ **-** ${p.links}`, false);

    });

message.channel.send(embed)

}
}
