const config = require("../config.json");
const { client } = require("discord.js")

exports.run = (client, id) => {

    
    client.shard.broadcastEval(`
    let aLogs = this.channels.cache.get('566523623683391498');
    if(aLogs) aLogs.send("<:idle:653279331107209285> | the shard \`#${id + 1}\` was disconnected ! trying to reconnect");
`);

  }