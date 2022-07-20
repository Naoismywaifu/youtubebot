const Command = require("../../Base/Command");
const fetch = require("node-fetch")
const {MessageEmbed} = require("discord.js")

class Cat extends Command {

    constructor(client) {
        super(client, {
            name: "cat",
            aliases: ["kitten","meow"],
        });

    }

    async run(message, args) {


       let {file} = await fetch('https://aws.random.cat/meow').then(response => response.json());
        if(!file)
            return message.channel.send(this.t("commands:Fun.cat.noFound"))

        let embed = new MessageEmbed()
            .setImage(file)
            .setColor("RANDOM")
            .setFooter("YouTube Bot", this.client.user.displayAvatarURL())

        return message.channel.send({embeds: [embed]})

    }

}

module.exports = Cat;