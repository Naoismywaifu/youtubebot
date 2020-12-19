const Command = require("../../Base/Command");

class Loop extends Command {

    constructor(client) {
        super(client, {
            name: "join",
            DJOnly: true,
            guildOnly: true,
            aliases: ["summon", "connect", "sum", "j"]
        });
    }

    async run(message, args) {


        if(!message.member.voice.channel) return message.channel.send(this.t("commands:Music.noVoiceChannel"))

        if(!message.member.voice.channel.joinable)
            return message.channel.send(this.t("commands:Music.unjoinable"))
        if(!message.member.voice.channel.speakable)
            return message.channel.send(this.t("commands:Music.unspeakable"))

        if(this.client.player.queue.get(message.guild.id) && !message.guild.me.voice.channel) return message.channel.send(this.t("commands:Music.alreadyInChannel"))

        message.member.voice.channel.join().then(() => {
            message.channel.send(this.t("commands:Music.join.success", { vcName: message.member.voice.channel.name }))
        })
    }

}

module.exports = Loop;