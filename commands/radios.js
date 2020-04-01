const Discord = require('discord.js');
const radios = require('../assets/radios.json')
module.exports.run = async (client, message, args) => {


message.channel.send("<a:loading:653279329022640128> Fetching data...").then((m) => {


    let embed = new Discord.MessageEmbed()
    .setTitle("Radios - YouTube Bot")
    .setDescription("To play a radio who is here use `yt*play-radio <name>`\nWant to add your own/favorite radio ? [[click here](https://discord.gg/C67wqwZ)]")
        for(var fxes in radios) {
            embed.addField(fxes, `language: \`${radios[fxes].lang}\`\n[url](${radios[fxes].url})`)
        }
        m.edit("",embed)

    });



}

module.exports.help = {
    name: "radios",
    group: "Premium",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "radios",
    aliases: ["radio-list", "radio", "radios-list"],
    description: "get a list of webradio who can be played"
    }