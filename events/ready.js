const Player = require("../Base/Player")

class Ready {

    constructor(client) {
        this.client = client;
    }

    run() {
    try {
            this.client.player = new Player(this.client)
        } catch (e) {
            this.client.logger.log(`Failed to init the player: ${e}`, "error")
        }
        this.client.logger.log(`${this.client.user.tag} is online on shard #${this.client.shard.ids[0]||0}`)


    }

}

module.exports = Ready;