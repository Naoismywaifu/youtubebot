class ShardResume {

    constructor(client) {
        this.client = client;
    }

    run(shard) {

        this.client.poster.start()
        return this.client.logger.shardEvent(this.client, shard+1, "resumed", null)

    }
}

module.exports = ShardResume;