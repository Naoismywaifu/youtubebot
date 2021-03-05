const { ShardingManager } = require('discord.js');
const {TOKEN, SHARDS} = require("./config")
const Logger = require("./Util/Logger")
const manager = new ShardingManager('./index.js', { 
    token: TOKEN,
    respawn: true,
    mode: "worker",
    totalShards: SHARDS||"auto"
});

manager.on('shardCreate', shard => Logger.log(`Shard ${shard.id} ready !`, 'ready'));
manager.spawn(SHARDS||"auto", 3*1000, 60*1000);