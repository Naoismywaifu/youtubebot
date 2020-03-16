const Discord = require("discord.js")
function EIL(cmd, guild, MsgAuthor, client, Logger) { 
    
var Embed = new Discord.MessageEmbed()
.setTitle(`EIL - ${cmd}`)
.addField("Command", cmd, false)
.addField("Server", `${guild.name} with id ${guild.id}`, true)
.addField("Executor", `${MsgAuthor.tag} with id ${MsgAuthor.id}`, true)
.addField("Other Data", Logger, false)
.setColor("ORANGE")
.setFooter("command executed by" + MsgAuthor.tag, MsgAuthor.avatarURL)
.setTimestamp()

client.shard.broadcastEval(`
let aLogs = client.channels.cache.get('685170528679362620');
if(aLogs) aLogs.send(Embed);
`)
return "success";
  }
  exports.EIL = EIL;
  