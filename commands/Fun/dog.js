const Command = require("../../Base/Command");
const fetch = require("node-fetch")
const {MessageEmbed} = require("discord.js")

class Dog extends Command {

    constructor(client) {
        super(client, {
            name: "dog",
            aliases: [],
        });

    }

    async run(message, args) {

        let files = await fetch("https://random.dog/doggos").then(res => res.json())
        if(!files[0])
            return message.channel.send(this.t("commands:Fun.dog.noFound"))

        let file = files[Math.floor(Math.random() * files.length)];
        if(!file)
            return message.channel.send(this.t("commands:Fun.dog.noFound"))

        let embed = new MessageEmbed()
            .setImage(`https://random.dog/${file}`)
            .setColor("RANDOM")
            .setFooter("YouTube Bot", this.client.user.displayAvatarURL())

        return message.channel.send(embed)

    }

}

module.exports = Dog;