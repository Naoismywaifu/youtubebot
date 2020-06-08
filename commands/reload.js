const Discord = require("discord.js")

module.exports = {
        name: 'reload',
        description: 'reload a specific command !',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: true,
        args: true,
        enabled: true,
        category: "Owner",
        usage: '<command name>',
        args: true,
        aliases: ["rl"],
        execute(client, message, args) {
            if(message.author.id !== "355995885085392896") return;

            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            
            if (!command) return message.channel.send(message.language.get("RELOAD_NOCMD", commandName));

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);
                message.channel.send(message.language.get("RELOAD_SUCCESS", command.name));

            } catch (error) {
                console.log(error);
                message.channel.send(message.language.get("RELOAD_FAILED", command.name, error.message));
            }


            }


        }