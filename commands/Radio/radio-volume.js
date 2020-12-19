const Command = require("../../Base/Command");

class RadioVolume extends Command {

    constructor(client) {
        super(client, {
            name: "radio-volume",
            DJOnly: true,
            premiumOnly: true,
            guildOnly: true,
            aliases: []
        });
    }

    async run(message, args) {

        if (this.client.player.queue.get(message.guild.id)) return message.channel.send(this.t("commands:Radio.radio.alreadyInChannel"))
        if(!this.client.radioManager.queue.has(message.guild.id)) return message.channel.send(this.t("commands:Radio.notPlaying"))

        if (!args[0])
            return message.channel.send(this.t("commands:Music.volume.currVolume", {
                vol: this.client.db.radiomanager.get(`${message.guild.id}.volume`)||0
            }));

        let maxVolume = this.client.config.MUSIC.PREMIUM_MAX_VOLUME;

        if (isNaN(args[0])) return message.channel.send(this.t("commands:Music.volume.NaN"));

        let value = parseInt(args[0]);

        if(value > maxVolume) return message.channel.send(this.t("commands:Music.volume.limit", {
            volmax: maxVolume
        }))

        if(value < 0) return message.channel.send(this.t("commands:Music.volume.invalidVal"));


        await this.client.radioManager.setVolume(message.guild.id, value)

        return message.channel.send(this.t("commands:Music.volume.success", {
            vol: value
        }));


    }


}

module.exports = RadioVolume;