const Discord = require("discord.js")
exports.run = (client, guild) => {
    var Embed = new Discord.MessageEmbed()
        .setTitle("Add")
        .addField("Server", guild.name) 
        .addField("Owner id", guild.ownerID)
        .addField("Owner name", guild.owner.user.tag)
        .addField("Server id", guild.id)
        .addField("Members", guild.memberCount)
        .setFooter("Youtube Bot | Logs")
        try {
        client.shard.broadcastEval(`
            
            let aLogs = this.client.channels.cache.get('566523623683391498')
            if(aLogs) aLogs.send(${Embed});
        `);
    } catch (e) {
        console.log(e)
}


            let joinEmbed = new Discord.MessageEmbed()
            .setTitle("You have added youtube bot to your guild")
            .setDescription(`Hello ${guild.owner.user.tag}! Thanks for adding me to your server !`)
            .addField("__**HELP**__", "If you need some help join [the support server](https://discord.gg/C67wqwZ) !")
            .addField("__**LINKS**__", `> Add the bot [[Click here]](https://discordapp.com/api/oauth2/authorize?client_id=486948160124485642&permissions=2146958847&scope=bot)\n> Support server  [[Click here]](https://discord.gg/C67wqwZ)\n`)
            .setFooter("Youtube Bot")
            .setTimestamp()
            .setColor("RED")
            guild.owner.send(joinEmbed);

}