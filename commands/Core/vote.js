const Command = require("../../Base/Command");
const botlists = require("../../assets/botlists.json")
const {MessageEmbed} = require("discord.js")
class Vote extends Command {

    constructor(client) {
        super(client, {
            name: "vote",
            aliases: ["topgg"],
        });

    }

    async run(message, args) {


        let embed = new MessageEmbed()
            .setImage("https://top.gg/api/widget/486948160124485642.svg")
            .setDescription(this.t("commands:Core.vote.desc"))
            .setColor("RED")
        botlists.forEach(p => {
            if(p.certified === "true"){
                var name = `${this.client.config.EMOJIS.certified} - ${p.emoji} ${p.name}`
            } else {
                var name = `${p.emoji} ${p.name}`
            }

            embed.addField(name, `[${this.t("commands:Core.vote.website")}](${p.website}) • [${this.t("commands:Core.vote.vote")}](${p.vote})`, true);

        });

        return message.channel.send(embed)

    }

}

module.exports = Vote;