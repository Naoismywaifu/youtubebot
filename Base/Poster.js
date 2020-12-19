const blapi = require("blapi");

class Poster {
    constructor(client) {
        this.client = client;
        this.client.logger.log(`Starting posting stats`, "debug")
        blapi.handle(this.client, this.client.config.BOTLISTS, 30);
    }

    getPoster(){
        return blapi;
    }
}
module.exports = Poster;