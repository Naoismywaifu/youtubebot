const Discord = require('discord.js')
const config = require("../config.json")
const { EIL } = require("../EIL.js")
const { premium } = require("../premium")
const os = require("os")
exports.run = async (client, message, args) => {

    if(message.author.id !== "355995885085392896") return;

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

 // var ex = EIL("eval", message.guild, message.author, client, "a simple example")


 
    if(message.author.id !== "355995885085392896") return;
    try {
      const code = args.join(" ");
      let evaled = await eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
        var evaluembed = new Discord.MessageEmbed()
        .setTitle("🤖 EVALUATION 🤖")
        .addField("📥 • Input", code)
        .addField("📤 • output", `\`\`\`${evaled}\`\`\``)

      message.channel.send(evaluembed);
    } catch (err) {
 
        var evaluembed = new Discord.MessageEmbed()
        .setTitle("🛑 ERROR 🛑")
        .addField("🛑 • Error", `\`\`\`${err}\`\`\``)

      message.channel.send(evaluembed)
      
 
      }
  }


module.exports.help = {
    name: "eval",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "help (my command)",
    aliases: ["evaluate"],
    description: "Evaluate a code"
    }