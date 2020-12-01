const Command = require("../../Base/Command");

class Play extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p"],
        });

    }

    async run(message, args) {


    
    }

}

module.exports = Play;