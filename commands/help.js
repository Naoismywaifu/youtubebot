const config = require('../config.json');
const Discord = require('discord.js')

exports.run = (client, message, args) => {

    /*
    const embed = new Discord.RichEmbed()
    .setTitle("🎶 Help - Youtube Bot ✨")
    .setDescription(`• The Server's prefix is \`${config.prefix}\` `)
    .addField("__**🍪 Useful**__", `» ${config.prefix}**help**
    » ${config.prefix}**ping**
    » ${config.prefix}**ping**
    » ${config.prefix}**ping**
    » ${config.prefix}**ping**
    » ${config.prefix}**ping**`, true)
    .addField("__**🎶 Music**__", `
    » ${config.prefix}**play**
    » ${config.prefix}**np**
    » ${config.prefix}**skip**
    » ${config.prefix}**stop**
    » ${config.prefix}**queue**`, true)
    .addField("__**🎶 Giveaways**__", `
    » ${config.prefix}**gstart**
    » ${config.prefix}**reroll**
    » ${config.prefix}**gdelete**
    » ${config.prefix}**gedit**
    » ${config.prefix}**giveaways**`, false)
    .addField(`bot's tip: use the command ${config.prefix}ping to know the bot's ping`, config.footer, false)
*/


if(args[0] === "help") return message.channel.send("you are currently using the command. Lmao")

if(args[0]){
    let command = args[0];
    if(client.commands.has(command)) {
        command = client.commands.get(command);
        var Hembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`requested by ${message.author.tag}`, message.author.displayAvatarURL)
        .setDescription(`**My prefix is:** \`${config.prefix}\`
        **Command:** \`${command.help.name || "internal error"}\`
        **Usage:** \`${command.help.usage || "not defined"}\`
        **allias:** \`${command.help.aliases || "no allias"}\`
        **Description:** \`${command.help.description || "not defined"}\`
        **Category:** \`${command.help.group || "Useful"}\`
        `)
        message.channel.send(Hembed)

    }
}

if(!args[0]){
 


    
    temparray = [];
client.commands.forEach((c) => {
    if(!c.help.group){
     message.channel.send(`🛑 | Hmmmm is strange... my bot owner has forget to add to the command ${c.help.name}, this will be reported to him`)
    client.users.get("355995885085392896").send("kernel panic !! at the command " + c.help.name + " add the group on the module exportation !!!!")
    } else {
        var group = (c.help.group)
        if(!temparray.includes(group)){
                        if(c == "Owner" && message.author.id !== "355995885085392896"){

                        } else {
                temparray.push(group)
                        }
        }
    }
})
let i = 0;
client.commands.forEach((cretetrt) => {
i++
})


    var embed = new Discord.MessageEmbed()
    .setTitle("🎶 Help - Youtube Bot ✨")
    .setDescription(`• The Server's prefix is \`${config.prefix}\`\n __there is all commands avalable on Youtube Bot__ **(${i})**`)
    .setThumbnail(client.user.DisplayAvatarURL)
    .setTimestamp()
    .setColor("dc322f")

temparray.forEach((c) => {
    if(temparray.includes(c)){
        let tempcmdarray = []
        client.commands.forEach((cmd) => {
        if(cmd.help.group === c){
        tempcmdarray.push(cmd.help.name)

    }
    })

    if(c === "Owner" && message.author.id != "355995885085392896"){
        return;
    }
    
        let final = (tempcmdarray.map(cmdfinal=>cmdfinal).join(', '))

        if(config.help_emojis.hasOwnProperty(c)){
            var c = `${config.help_emojis[c]} » ${c} - (${tempcmdarray.length})`
        } else {
            var c = `» ${c} - (${tempcmdarray.length})`
        }


        embed.addField(c, "```diff\n- " + final + "\n```", false);

    } else {
        message.channel.send("error while generating the message embed... please contact my owner")
    }
})

message.channel.send(embed)

}

   // message.channel.send(embed)

}
module.exports.help = {
    name: "help",
    group: "Core",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "help <commmand name>",
    aliases: ["h", "aide", "helping"],
    description: "New on the bot ? execute this command to know all commands on the bot"
    }