const Player = require("../Base/Player")

class Debug {

    constructor(client) {
        this.client = client;
    }

    run(d) {

        console.log("🧪 DEBUG : " + d)

    }
}

module.exports = Debug;