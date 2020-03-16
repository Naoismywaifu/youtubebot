const Discord = require("discord.js")
exports.run = (client, guild) => {
    var Embed = new Discord.MessageEmbed()
        .setTitle("Remove")
        .addField("Server name", guild.name) 
        .addField("Owner id", guild.ownerID)
      //  .addField("Owner name", guild.owner.username)
        .addField("Server id", guild.id)
        .addField("Members", guild.memberCount)   
	.setFooter("Youtube Bot | Logs") 
	.setColor("RED")
        client.shard.broadcastEval(`
	let { client } = require("discord.js")
            let aLogs = client.channels.cache.get('566523623683391498');
            if(aLogs) aLogs.send(Embed);
        `);
}