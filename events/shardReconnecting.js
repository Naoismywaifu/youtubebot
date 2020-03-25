const config = require("../config.json");
const { client } = require("discord.js")

exports.run = (client, id) => {

    
    client.shard.broadcastEval(`
    let aLogs = this.channels.cache.get('566523623683391498');
    if(aLogs) aLogs.send("<a:loading:653279329022640128> | the shard \`#${id + 1}\` is now trying to reconnect...");
`);

  }