class Raw {

    constructor(client) {
        this.client = client;
    }

    run(d) {
        try {
            this.client.player.manager.updateVoiceState(d)
        } catch (e) {}
        return true;

    }
}

module.exports = Raw;