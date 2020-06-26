const Discord = require("discord.js")
const config = require("../config.json")


exports.run = async (client, shard) => {
const hook = new Discord.WebhookClient(config.webhook_public_logging.id, config.webhook_public_logging.token)

var embed = new Discord.MessageEmbed()
.setDescription(`<:idle:724244855756161034> | The shard ${shard + 1} is now tring to reconnect !`)
.setColor("ORANGE")
hook.send(embed)

check247()

async function check247() {

    for (let i=0; i < client.radiomanager.all().length; i++){
        const out = client.radiomanager.all()[i].ID
        const guildid = out
        const channelid = client.radiomanager.get(`${out}.voicechannel`)
        const url = client.radiomanager.get(`${out}.url`)
        const title = client.radiomanager.get(`${out}.title`)
    
        if(!client.guilds.cache.get(guildid)) return;
        if(!client.channels.cache.get(channelid)) return client.radiomanager.delete(guildid);
    
        if(!client.guilds.cache.get(guildid).me.voice.channel){
            let connection = await client.channels.cache.get(channelid).join()
            connection.play(url)
        }
    
        if(!client.guilds.cache.get(guildid).me.voice.connection){
            let connection = await client.guilds.cache.get(guildid).me.voice.channel.join()
            connection.play(url, {
                volume: 1,
              })
        }
    
    }
    
    }


}