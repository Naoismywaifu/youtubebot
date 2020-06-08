const Discord = require("discord.js")

exports.run = async (client, message) => {
    if (message.author.bot) return;
  
    if (message.content.startsWith(client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix)) {
        const args = message.content.slice(client.db.guildconf.has(`${message.guild.id}.prefix`) ? client.db.guildconf.get(`${message.guild.id}.prefix`).length : client.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
            if (!command) return;
            
        let language = new(require(`../languages/${client.db.guildconf.has(`${message.guild.id}.language`) ? client.db.guildconf.get(`${message.guild.id}.language`) : client.config.defaultLanguage}.js`));
        message.language = language;


        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (!command.enabled && message.author.id !== "355995885085392896") {
            return message.channel.send(message.language.get("MESSAGE_ERROR_DISABLED"))
        }

        if (command.args && !args.length) {
                    let reply = message.language.get("MESSAGE_ERROR_ARGS");
            
                    if (command.usage) {
                        reply += `\n${message.language.get("MESSAGE_ERROR_ARGS_CRRECT", client.db.guildconf.get(`${message.guild.id}.prefix`)||client.prefix, command.name, command.usage)}`;
                    }
            
                    return message.channel.send(reply);            	
                }

                if (command.ownerOnly && message.author.id !== "355995885085392896") {
                    return message.channel.send(message.language.get("MESSAGE.ERROR.OWNERONLY"))
                }
               


if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = client.cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(message.language.get("MESSAGE_ERROR_WAIT", timeLeft.toFixed(1), command));
    }
}

timestamps.set(message.author.id, now);


setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
if(!client.db.guildconf.get(`${message.guild.id}.telemetrics`)){
require("../TL.js").TL(message)
}


try {
await command.execute(client, message, args);
} catch (error) {
console.error(error);
message.reply(message.language.get("MESSAGE_ERROR_CMDEXEC"));
}

    }

}