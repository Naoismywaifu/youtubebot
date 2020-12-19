const Command = require("../../Base/Command");

class Ping extends Command {

    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["pong"],
        });

    }

    async run(message, args) {


        const initial = message.createdTimestamp;

        message.channel.send(this.t("commands:Core.ping.pinging"))

            .then(m => {
                const latency = m.createdTimestamp - initial;

                return m.edit(this.t("commands:Core.ping.success", {
                    latency: latency
                }));
            });
    }

}

module.exports = Ping;