const Player = require("../Base/Player")

class Ready {

    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.logger.log(`${this.client.user.tag} is online on shard #${this.client.shard.ids[0]||0}`)

        this.client.player = new Player(this.client)
        
    }

}

module.exports = Ready;