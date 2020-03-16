var Discord = require("discord.js");
const config = require("../config.json")
exports.run = async (client, message) => {
    if (message.author.bot) return; 
    if (message.channel.type === "dm") return message.channel.send("🛑 | Oops: commands are executable only on a server");
  
    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let cmdfinal = messageArray[0].toLowerCase().replace(prefix,'');
    if(!message.content.startsWith(prefix)) return;
   /*
 if(client.commands[cmdfinal].help.botperms){
   client.commands[cmdfinal].help.botperms.forEach((p) => {
     if(client.user.hasPermission(p)){
       let commandfile = (client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length))))
       if(commandfile) commandfile.run(client, message, args);
     } else {
       message.channel.send("🛑 | Oops: please add to me this permission for work correctly: `" + p + "`")
     }
   })
 }
 
 */
 
   let commandfile = (client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length))))
   if(commandfile) await commandfile.run(client, message, args);
 
}