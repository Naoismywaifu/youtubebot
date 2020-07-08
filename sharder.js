const { ShardingManager } = require('discord.js');
const config = require("./config.json")
moment = require("moment"), 
shards = new ShardingManager("./index.js", {
    token: config.TOKEN, 
    totalShards: config.shards,
	respawn: true
});

shards.on('shardCreate', (shard) => {
    shard.on('message', (message) => {
        if(message === 'reboot'){
            shard.respawn();
        }
    });
});


shards.on("launch", (shard) => { 
	console.log(`${get_date(new Date())} launched shard ${shard.id}.`);
});

shards.spawn() //When all shards are loaded, it puts a message in the console.
	.then(() => {
		console.log(`${get_date(new Date())} ${shards.totalShards} shards are totally launched.`);
	});

function get_date (date) { //get_date function allows you to see the shards launch date.
	const time = `[${moment().format("DD/MM/YYYY HH:mm:ss")}]`;

	return time;
};