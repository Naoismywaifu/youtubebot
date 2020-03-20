const Discord = require("discord.js")
exports.run = (client, guild) => {
    var embed = new Discord.MessageEmbed()
        .setTitle("Remove")
        .addField("Server name", guild.name) 
        .addField("Owner id", guild.ownerID)
        .addField("Owner name", guild.owner.user.tag)
        .addField("Server id", guild.id)
        .addField("Members", guild.memberCount)   
	.setFooter("Youtube Bot | Logs") 
        .setColor("RED")
        try {
        client.shard.broadcastEval(`
            let aLogs = this.channels.cache.get('566523623683391498');
            if(aLogs) aLogs.send(${embed});
        `);
} catch (e) {
        console.log(e)
}
}