const { bgBlue, black, green } = require("chalk");
const {WebhookClient, MessageEmbed} = require("discord.js")
function dateTimePad(value, digits){
	let number = value;
	while (number.toString().length < digits) {
		number = "0" + number;
	}
	return number;
}

function format(tDate){
	return (tDate.getFullYear() + "-" +
    dateTimePad((tDate.getMonth() + 1), 2) + "-" +
    dateTimePad(tDate.getDate(), 2) + " " +
    dateTimePad(tDate.getHours(), 2) + ":" +
    dateTimePad(tDate.getMinutes(), 2) + ":" +
    dateTimePad(tDate.getSeconds(), 2) + "." +
    dateTimePad(tDate.getMilliseconds(), 3));
}

module.exports = {

	async log(content, type = "log") {
		const date = `[${format(new Date(Date.now()))}]:`;
		switch (type) {
			// Check the message type and then print him in the console
			case "log": {
				return console.log(`${date} ${bgBlue(type.toUpperCase())} ${content} `);
			}
			case "warn": {
				return console.log(`${date} ${black.bgYellow(type.toUpperCase())} ${content} `);
			}
			case "error": {
				return console.log(`${date} ${black.bgRed(type.toUpperCase())} ${content} `);
			}
			case "debug": {
				return console.log(`${date} ${green(type.toUpperCase())} ${content} `);
            }
			case "cmd": {
				return console.log(`${date} ${black.bgWhite(type.toUpperCase())} ${content}`);
			}
			case "ready": {
				return console.log(`${date} ${black.bgGreen(type.toUpperCase())} ${content}`);
			} 
			default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	},

	async shardEvent(client, shardID, type, err = "") {

		if(!type) throw new TypeError("No type provided!")
		if(!shardID) throw new TypeError("No shard provided!")

		switch (type) {
			case "ready":
				return new WebhookClient(client.config.SHARDSLOGGER.ID, client.config.SHARDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.STATUSEMOJIS.online} | Shard **#${shardID}** now ready!`).setColor("GREEN"))
			case "reconnect":
				return new WebhookClient(client.config.SHARDSLOGGER.ID, client.config.SHARDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.STATUSEMOJIS.dnd} | Shard **#${shardID}** reconnecting...`).setColor("RED"))
			case "disconnected":
				return new WebhookClient(client.config.SHARDSLOGGER.ID, client.config.SHARDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.STATUSEMOJIS.offline} | Shard **#${shardID}** disconnected! waiting for connection...`).setColor("GREY"))
			case "resumed":
				return new WebhookClient(client.config.SHARDSLOGGER.ID, client.config.SHARDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.STATUSEMOJIS.idle} | Shard **#${shardID}** resumed!`).setColor("YELLOW"))
			case "error":
				return new WebhookClient(client.config.SHARDSLOGGER.ID, client.config.SHARDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.STATUSEMOJIS.dnd} | Shard **#${shardID}** received an error!\nError: ${err}`).setColor("DARK_RED"))
		}
		return true;

	},
	async logCMD(client, msg, cmd, args) {
		return new WebhookClient(client.config.CMDSLOGGER.ID, client.config.CMDSLOGGER.TOKEN).send(new MessageEmbed().setDescription(`${client.config.EMOJIS.arrow} | user **${msg.author.tag||"user#0000"}** ran the command **${cmd}**.\nGuild: **${msg.guild ? msg.guild.name : "DMs"}**\nShard: **#${client.shard.ids[0]+1}**\nArgs: **${args.length ? args.join(", ") : "none"}**`).setColor("YELLOW"))
	}
};