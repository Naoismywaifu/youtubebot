const Command = require("../../Base/Command");
const {MessageEmbed} = require("discord.js")
class Invite extends Command {

    constructor(client) {
        super(client, {
            name: "invite",
            aliases: ["add"],
        });

    }

    async run(message, args) {


        let embed = new MessageEmbed()
            .setTitle("YouTube Bot")
            .setDescription(this.t("commands:Core.invite.desc"))
            .addField(this.t("commands:Core.invite.allPerms"), `[${this.t("commands:Core.invite.inviteWord")}](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=2146958847)`, false)
            .addField(this.t("commands:Core.invite.noPerms"), `[${this.t("commands:Core.invite.inviteWord")}](https://discordapp.com/oauth2/authorize?client_id=486948160124485642&scope=bot&permissions=0)`, false)
            .addField(this.t("commands:Core.invite.vote"), `[${this.t("commands:Core.invite.voteWord")}](https://top.gg/bot/486948160124485642/vote)`, false)
            .setFooter("Youtube Bot", this.client.user.displayAvatarURL())
            .setColor("RED")
        return message.channel.send(embed)

    }

}

module.exports = Invite;