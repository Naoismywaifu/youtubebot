const fs = require("fs");
const config = require("../config.json");
const { premium } = require("../premium.js");

exports.run = async (client) => {

client.dbl.postStats(client.guilds.cache.size, client.shard.ids, client.shard.count);

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
  







  setInterval(function (){
    client.user.setActivity(`${config.prefix}help · youtube-bot.com · shard ${client.shard.ids[0] + 1}/${client.shard.count} `)
    
client.dbl.postStats(client.guilds.cache.size, client.shard.ids, client.shard.count);

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

  }, 30 * 60 * 1000)

   console.log(`✅ | [YouTube Bot] ready in ${client.guilds.cache.size} server(s) with a total of ${client.users.cache.size} users.`)
   console.log(`✅ | [YouTube Bot] shard [${client.shard.ids[0] + 1}/${client.shard.count}]`)
   console.log(`✅ | Bot Invite: https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  }