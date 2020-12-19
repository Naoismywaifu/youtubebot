class ShardReady {

    constructor(client) {
        this.client = client;
    }

    run(shard) {

        return this.client.logger.shardEvent(this.client, shard+1, "ready", null)

    }
}

module.exports = ShardReady;