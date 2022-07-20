const Discord = require("discord.js")
const Command = require("../../Base/Command");
const radios = require("../../assets/radios.json")


class Radio extends Command {

    constructor(client) {
        super(client, {
            name: "radio",
            DJOnly: true,
            premiumOnly: true,
            guildOnly: true,
            aliases: []
        });
    }

    async run(message, args) {


        if(!message.member.voice.channel) return message.channel.send(this.t("commands:Music.noVoiceChannel"))

        if(!message.member.voice.channel.joinable)
            return message.channel.send(this.t("commands:Music.unjoinable"))
        if(!message.member.voice.channel.speakable)
            return message.channel.send(this.t("commands:Music.unspeakable"))

        if(this.client.player.queue.get(message.guild.id)) return message.channel.send(this.t("commands:Radio.radio.alreadyInChannel"))

        if(!args[0]) {
            let listradiosembed = new Discord.MessageEmbed()
                .setColor("ORANGE")
                .setTitle(this.t("commands:Radio.radio.listOfRadios"))
            for (let i = 0; i < Object.keys(radios).length; i++) {
                let rad = radios[Object.keys(radios)[i]]
                let name = this.findByURL(radios, rad.url)
                listradiosembed.addField(name, this.t("commands:Radio.radio.lang",{
                    lang: rad.lang
                }), true)
            }
            
            return message.channel.send({embeds: [listradiosembed]})
        }
        if(!radios[args[0]])
            return message.channel.send(this.t("commands:Radio.radio.noExist"))

        let rad = radios[args[0]]


        this.client.db.radiomanager.set(message.guild.id, {
            "guild": message.guild.id,
            "url": rad.url,
            "voicechannel": message.member.voice.channel.id,
            "volume":100
        })

        await this.client.radioManager.play(message.member.voice.channel.id, rad.url, message.guild.id)

        return message.channel.send(this.t("commands:Radio.radio.success"))

    }
    findByURL(object, value) {
        return Object.keys(object).find(key => object[key].url === value);
    }


}

module.exports = Radio;