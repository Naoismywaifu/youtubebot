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
 
  let replypremium = await client.db.get(message.author.id)
  if(replypremium === true){
    message.author.premium = true;
  } else {
    message.author.premium = false;
  }
 


 try {
   let commandfile = (client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length))))

   if(commandfile) await commandfile.run(client, message, args);
  } catch (e) {
let embederr = new Discord.MessageEmbed()
.setTitle("❌ Error ❌")
.setDescription("a error was occured during the execution of the command")
.addField("Error", e)
.setFooter("YouTube Bot")
.setColor("RED")
message.channel.send(embederr)

  }



}