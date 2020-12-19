class ShardDisconnect {

    constructor(client) {
        this.client = client;
    }

    run(shard) {

        this.client.logger.shardEvent(this.client, shard+1, "disconnected", null)
        return this.client.shard.broadcastEval(`if (this.shard.ids[0] === ${shard}) process.exit(0);`);


    }
}

module.exports = ShardDisconnect;