const Discord = require("discord.js")
const config = require("../config.json")


exports.run = async (client, shard) => {
const hook = new Discord.WebhookClient(config.webhook_public_logging.id, config.webhook_public_logging.token)

var embed = new Discord.MessageEmbed()
.setDescription(`<:online:724244856607604797> | The shard ${shard + 1} just resumed !`)
.setColor("GREEN")
hook.send(embed)


}