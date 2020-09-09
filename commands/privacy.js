const  Discord = require("discord.js")
const conf = require("../config.json")
const fetch = require("node-fetch");

module.exports = {
    name: 'privacy',
    description: 'our Privacy Policy.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Core",
    usage: '',
    aliases: ["ppolicy", "myData"],
    async execute(client, message, args) {
let emb = new Discord.MessageEmbed()
.setTitle("YouTube Bot Privacy Policy")
.addField("1. Storing and/or using user data", `
a: YouTube stores user data such as your unique ID, guilds you are in, or the number of commands executed.
This data is stored for statistical purposes, but can in no way be transmitted to partners, we store your data securely on our servers to protect you.
b: We also use data that you provide us with yourself, such as prefixes, language preference or filters.
`, false)
.addField("2. Why we store this data", `
a: This data is used to improve your user experiance, make possible some commands, if we don't store these data the bot will be highly limited !
`, false)
.addField("3. Removal of data", `
a: You must contact us by our support server (https://discord.gg/KU5xgeh)
b: You can also contact us by twiter ! https://twitter.com/youtubebotteam
`, false)
.addField("4. Who can access the data", `
a: Only the high staff can access to the data. NO ONE ELSE HAS ACCESS TO THIS DATA.
`)
.addField("5: Update information", `
We hold a legal right to update this document AT ANY TIME, we will however, attempt to give users ample notification within the bots info command.
LAST UPDATED:
29/08/2020
`)
.setColor("RED")
return message.channel.send(emb)


}

}