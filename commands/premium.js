const Discord = require("discord.js")

module.exports = {
        name: 'premium',
        description: 'More about premium ? everything is here !',
        cooldown: 5,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Premium",
        usage: '',
        aliases: ["vip"],
        execute(client, message, args) {

if(client.db.guildconf.get(`${message.guild.id}.premium`)){
var embed = new Discord.MessageEmbed()
.setTitle("YouTube Bot Premium 🌟")
.setDescription(message.language.get("PREMIUM_YES_CONGRATS"))
.setFooter("YouTube Bot")
.setColor("GREEN")
} else {

    var embed = new Discord.MessageEmbed()
    .setTitle("YouTube Bot Premium 🌟")
    .setDescription(message.language.get("PREMIUM_NO_OHNO") + "\n" + message.language.get("PREMIUM_NO_ARGUMENTS"))
    .addField(message.language.get("PREMIUM_WANT_PURCHASE"), `[[${message.language.get("PREMIUM_SUPPORT_SERVER")}]](https://discord.gg/stUcGXw) & [[${message.language.get("PREMIUM_PURCHASE")}]](https://donatebot.io/checkout/718419838145527910)`)
    .setFooter("YouTube Bot")
    .setColor("RED")



    /**
 :premium: Spice'up your YouTube Bot experiance and support YouTube Bot by buying a YouTube Bot licence ! 
> It's only ~~10€~~ 5€ lifetime !
> To get so a lot functionalities in plus !
**Buying a licence while the christmas preiod ?**
> enjoy a beta tester licence in plus to test our news technologies :beta_tester: !
 */


}

return message.channel.send(embed)


            }


        }