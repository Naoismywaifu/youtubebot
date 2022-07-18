class ShardReady {

    constructor(client) {
        this.client = client;
    }

    run(shard, err) {

        if (err) {
            this.client.logger.error(`Shard ${shard.id} errored ! ${err}`, "error");
        }
        
        return this.client.logger.shardEvent(this.client, shard+1, "error", err.message)

    }
}

module.exports = ShardReady;