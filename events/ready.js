const fs = require("fs");
const config = require("../config.json");
const { premium } = require("../premium.js");

exports.run = (client) => {
  //console.log(premium(593365281611448320, client))

client.dbl.postStats(client.guilds.cache.size, client.shard.ids, client.shard.count);

  client.user.setActivity(`${config.prefix}help · youtube-bot.com · shard ${client.shard.ids[0] + 1}/${client.shard.count} `)

  setInterval(function (){
    client.user.setActivity(`${config.prefix}help · youtube-bot.com · shard ${client.shard.ids[0] + 1}/${client.shard.count} `)
    
client.dbl.postStats(client.guilds.cache.size, client.shard.ids, client.shard.count);

  }, 30 * 60 * 1000)

   console.log(`✅ | [YouTube Bot] ready in ${client.guilds.cache.size} server(s) with a total of ${client.users.cache.size} users.`)
   console.log(`✅ | [YouTube Bot] shard [${client.shard.ids[0] + 1}/${client.shard.count}]`)
   console.log(`✅ | Bot Invite: https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  }