const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const { prefix } = require("../util/functions.js")

module.exports = {
	  name: 'help',
    description: 'Need help ?',
    cooldown: 10,
    args: false,
    guildOnly: false,
    enabled: true,
    category: "Core",
    usage: '<command>',
    aliases: ["aide"],
	execute(client, message, args) {

        const { commands } = client;


        
if(args[0]){
    let data = []
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    
    if (!command) {
        return message.reply(message.language.get("HELP_COMMAND_EXIST"));
    }
    
    data.push(`**${message.language.get("UTILS").NAME}:** ${command.name}`);
    
    if (command.aliases) data.push(`**${message.language.get("UTILS").ALIASES}:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**${message.language.get("UTILS").DESCRIPTION}:** ${command.description}`);
    if (command.usage) data.push(`**${message.language.get("UTILS").USAGE}:** ${client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix}${command.name} ${command.usage}`);
    
    data.push(`**${message.language.get("UTILS").COOLDOWN}:** ${command.cooldown || 3} ${message.language.get("UTILS").SECONDS}`);
    
    var embed = new MessageEmbed()
    .setDescription(data)
    
    
    message.channel.send(embed);
} else {
 

    
    temparray = [];
    client.commands.forEach((c) => {
    if(!c.category){
     message.channel.send(`Hmmmm is strange... my bot owner has forget to add to the command ${c.name}, this will be reported to him`)
    } else {
        var group = (c.category)
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


var embed = new MessageEmbed()
.setTitle("YouTube Bot")
//.setDescription(`there is all of my commands (\`${commands.array().length}\`)\n**pro's tip:** use \`${client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix}help <command>\` to get informations about a command !`)
.setDescription(message.language.get("HELP_DESC_TOP", commands.array().length, client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix))
.setColor("DARK_RED")

temparray.forEach((c) => {
    if(temparray.includes(c)){
        let tempcmdarray = []
        client.commands.forEach((cmd) => {
        if(cmd.category === c){
        tempcmdarray.push(cmd.name)

    }
    })

    if(c === "Staff" && message.author.id != "355995885085392896"){
        return;
    }
    
        let final = (tempcmdarray.map(cmdfinal=>cmdfinal).join(', '))

        if(config.help_emojis.hasOwnProperty(c)){
            var c = `${config.help_emojis[c]} » ${c} - (${tempcmdarray.length})`
        } else {
            var c = `» ${c} - (${tempcmdarray.length})`
        }


        embed.addField(c,"```diff\n- " + final + "```", false);

    } else {
        message.channel.send(message.language.get("HELP_ERROR_GENERATION"))
    }
})

message.channel.send(embed)
}

}
}