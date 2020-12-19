const Command = require("../../Base/Command");

class Volume extends Command {

    constructor(client) {
        super(client, {
            name: "volume",
            DJOnly: true,
            guildOnly: true,
            aliases: ["vol"]
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        if (!args[0])
            return message.channel.send(this.t("commands:Music.volume.currVolume", {
                vol: serverQueue.volume
            }));

        let maxVolume = this.client.functions.premium(message) ? this.client.config.MUSIC.PREMIUM_MAX_VOLUME : this.client.config.MUSIC.MAX_VOLUME;


            if (isNaN(args[0].trim()))
                return message.channel.send(this.t("commands:Music.volume.NaN"));

            let value = parseInt(args[0]);


        if(value > maxVolume) return message.channel.send(this.t("commands:Music.volume.limit", {
                volmax: maxVolume
            }))
            if(value < 0) return message.channel.send(this.t("commands:Music.volume.invalidVal"));
            serverQueue.setVolume(value);
            return message.channel.send(this.t("commands:Music.volume.success", {
                vol: value
            }));

    }

}

module.exports = Volume;