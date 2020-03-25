const config = require("../config.json");
const { client } = require("discord.js")

exports.run = (client, id) => {

    
    client.shard.broadcastEval(`
    let aLogs = this.channels.cache.get('566523623683391498');
    if(aLogs) aLogs.send("<:online:653279333842157589> | the shard \`#${id + 1}\` was resumed !");
`);

  }