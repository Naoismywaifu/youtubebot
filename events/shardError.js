class ShardReady {

    constructor(client) {
        this.client = client;
    }

    run(shard, err) {

        return this.client.logger.shardEvent(this.client, shard+1, "error", err.message)

    }
}

module.exports = ShardReady;