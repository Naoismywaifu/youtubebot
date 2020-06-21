const Discord = require("discord.js")
const config = require("../config.json")


exports.run = async (client, err, shard) => {
const hook = new Discord.WebhookClient(config.webhook_public_logging.id, config.webhook_public_logging.token)
const hookerror = new Discord.WebhookClient(config.webhook.id, config.webhook.token);

var embed = new Discord.MessageEmbed()
.setDescription(`<:dnd:724244856226054154> | The shard ${shard + 1} just got a error, the error is now logged !`)
.setColor("RED")
hook.send(embed)

hookerror.send(`The shard ${shard + 1} just got a error: \`${err}\``)

}