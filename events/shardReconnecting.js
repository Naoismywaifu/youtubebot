const Discord = require("discord.js")
const config = require("../config.json")


exports.run = async (client, shard) => {
const hook = new Discord.WebhookClient(config.webhook_public_logging.id, config.webhook_public_logging.token)

var embed = new Discord.MessageEmbed()
.setDescription(`<:idle:724244855756161034> | The shard ${shard + 1} is now tring to reconnect !`)
.setColor("ORANGE")
hook.send(embed)


}