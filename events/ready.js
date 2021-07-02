const Player = require("../Base/Player")
const Notifier = require("../Base/NotificationManager")
const RadioManager = require("../Base/RadioManager")

class Ready {

    constructor(client) {
        this.client = client;
    }

    run() {
        try {
            this.client.player = new Player(this.client);
            this.client.notifier = new Notifier(this.client);
            this.client.radioManager = new RadioManager(this.client);
            this.client.poster.start();
        } catch (e) {
            this.client.logger.log(`Failed to init classes at boot: ${e}`, "error")
        }
        this.client.logger.log(`${this.client.user.tag} is online on shard #${this.client.shard.ids[0]||0}`)

        this.updatePresence()
        this.client.setInterval(() => this.updatePresence(), 25*60*1000)


    }

    updatePresence() {
        this.client.user.setPresence({
            activity: {
                name:`YouTube Bot • ${this.client.config.PREFIX}help • Shard ${this.client.shard.ids[0]+1}/${this.client.shard.count}`,
                type:"LISTENING",
            },
            afk: false,
            shardID: this.client.shard.ids[0],
            status: "online"
        }).catch(e => this.client.logger.log(e, "error"))
    }

}

module.exports = Ready;