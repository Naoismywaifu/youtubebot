const Discord = require("discord.js");
const fs = require("fs")
const { premium } = require("../premium.js")
const ms = require("ms")
module.exports.run = async (client, message, args) => {

if(!message.author.id === 355995885085392896) return message.channel.send("❌ | this command is only for the bot owner !")

    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
   



    if(!user) return message.channel.send("❌ | Error please provide the id or mention of the user to be upgrade")

    let checkpremium = await client.db.get(user.id)
    if(checkpremium) return message.channel.send("❌ | this user is already premium !")

if(args[1]){

let timeinms = ms(args[1])
message.channel.send("working...").then((m) => {
client.db.set(user.id, true, timeinms)
})


} else {
message.channel.send(`are you sure to make ${user.tag} premium for ever ?`).then((m) => {



m.react('✅').then(() => m.react('❌'));

const filter = (reaction, user) => {
	return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
};

m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
            m.edit("Working...")
            client.db.set(user.id, true)
            m.edit("✅ | this person is premium right now !")
		} else {
			m.edit("❌ | Canceled.")
		}
	})
	.catch(collected => {
		message.reply('⚠ | time\'s up');
    });
})
}



}

module.exports.help = {
    name: "addpremium",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "addpremium <id> <duration (optional)>",
    aliases: [],
    description: "make a user premium"
    }