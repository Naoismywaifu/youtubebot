const Discord = require("discord.js")
const config = require("../config.json")

exports.run = (client, message, args) => {
   if(message.author.id != "355995885085392896") return message.channel.send("This command is only for the bot developer")

   if(!args[0]) return message.channel.send("❌ | Please provide a command to reload!")

   let commandName = args[0].toLowerCase()

   try {
       delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
       client.commands.delete(commandName)
       const pull = require(`./${commandName}.js`)
       client.commands.set(commandName, pull)
   } catch(e) {
       return message.channel.send(`❌ | Could not reload: \`${args[0].toUpperCase()}\``)
   }

   message.channel.send(`✅ | The command \`${args[0].toUpperCase()}\` has been reloaded!`)

}

   module.exports.help = {
    name: "reload",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "reload <command>",
    aliases: ["rl"],
    description: "spooof reload command to don't require to restart the bot completly !"
    }

