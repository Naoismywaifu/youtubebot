const Command = require("../../Base/Command");

class ReloadLang extends Command {

    constructor(client) {
        super(client, {
            name: "reload-lang",
            aliases: ["rll", "rl-lang"],
        });
    }

    async run(message, args) {
        try {
            await this.client.localemanager.reloadLanguages();
            return message.channel.send(this.t("commands:Owner.reload-lang.success"))
        } catch (e) {
            return message.channel.send(this.t("commands:Owner.reload-lang.failed", {
                err: e
            }))
        }
    }

}

module.exports = ReloadLang;


