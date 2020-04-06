const config = require("../config.json");
const { client } = require("discord.js")

exports.run = (client, id) => {


  client.user.setActivity(`${config.prefix}help · youtube-bot.com · shard ${client.shard.ids[0] + 1}/${client.shard.count} `)


  client.radiodb.all().forEach(c => {
    if(client.guilds.cache.get(c.ID)){
 console.log("yes")
 let channelid = client.radiodb.get(`${c.ID}.channel`)
 let channel = client.channels.cache.get(channelid)
 if(!channel){
  return;
 } else {
  channel.join().then((connection) => {
  connection.play(client.radiodb.get(`${c.ID}.url`), {
      volume: 1,
    })
 })
}
    }
  })
  
    client.shard.broadcastEval(`
    let aLogs = this.channels.cache.get('566523623683391498');
    if(aLogs) aLogs.send("<:online:653279333842157589> | the shard \`#${id + 1}\` is now online and ready to be used");
`);

  }