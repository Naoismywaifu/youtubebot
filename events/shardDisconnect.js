const Discord = require("discord.js")
const config = require("../config.json")


exports.run = async (client, event, shard) => {
const hook = new Discord.WebhookClient(config.webhook_public_logging.id, config.webhook_public_logging.token)

var embed = new Discord.MessageEmbed()
.setDescription(`<:offline:724245207612260442> | The shard ${shard + 1} is now disconnected ! the shard hasn't sheduled to be restarted ! automatic restart...`)
.setColor("BLACK")
hook.send(embed)

client.shard.broadcastEval(`if (this.shard.ids[0] === ${shard}) process.exit(0);`);


}