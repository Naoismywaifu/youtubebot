const Discord = require("discord.js")
exports.run = (client, guild) => {


            let joinEmbed = new Discord.MessageEmbed()
            .setTitle("You just added YouTube Bot to your guild")
            .setDescription(`Hello ${guild.owner.user.tag}! Thanks for adding me to your server !`)
            .addField("__**HELP**__", "If you need some help join [the support server](https://discord.gg/C67wqwZ) !")
            .addField("__**LINKS**__", `> Add the bot [[Click here]](https://discordapp.com/api/oauth2/authorize?client_id=486948160124485642&permissions=2146958847&scope=bot)\n> Support server  [[Click here]](https://discord.gg/C67wqwZ)\n> Website [[Click here]](https://youtube-bot.com)\n> Vote  [[Click here]](top.gg/bot/486948160124485642/vote)\n`)
            .setFooter("Youtube Bot")
            .setTimestamp()
            .setColor("RED")
            guild.owner.send(joinEmbed);

}