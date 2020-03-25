const config = require("../config.json");
const { client } = require("discord.js")

exports.run = (client, error, shardID) => {

    
    client.shard.broadcastEval(`
    let aLogs = this.channels.cache.get('566523623683391498');
    if(aLogs) aLogs.send("<:donotdisturb:653279332629872640> | the shard \`#${shardID + 1}\` just get a error: ${error}");
`);

  }