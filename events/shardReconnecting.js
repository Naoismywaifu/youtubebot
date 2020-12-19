class ShardReconnecting {

    constructor(client) {
        this.client = client;
    }

    run(shard) {

        return this.client.logger.shardEvent(this.client, shard+1, "reconnect", null)

    }
}

module.exports = ShardReconnecting;