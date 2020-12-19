const Command = require("../../Base/Command");


class RadioStop extends Command {

    constructor(client) {
        super(client, {
            name: "radio-stop",
            DJOnly: true,
            premiumOnly: true,
            guildOnly: true,
            aliases: ["radiostop"]
        });
    }

    async run(message, args) {

        if (this.client.player.queue.get(message.guild.id)) return message.channel.send(this.t("commands:Radio.radio.alreadyInChannel"))
        if(!this.client.radioManager.queue.has(message.guild.id)) return message.channel.send("not playing")

        await this.client.radioManager.destroy(message.guild.id)

        return message.channel.send(this.t("commands:Radio.radio-stop.stopped"))

    }


}

module.exports = RadioStop;