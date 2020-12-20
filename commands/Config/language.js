const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Language extends Command {

    constructor(client) {
        super(client, {
            name: "language",
            guildOnly: true,
            aliases: ["lang", "languages"],
        });
        this.altlangs = ["french", "english"] // support old languages names

    }

    async run(message, args) {

        if(!args[0]) args[0] = "none"

    switch (args[0].toLowerCase()) {
        case "set":

            if(!this.client.languages.includes(args[1]||"null"))
                return message.channel.send(this.t("commands:Config.language.noValueProvided", {
                    languages: this.client.languages.join(", ")
                }));

            await this.client.db.guildconf.set(`${message.guild.id}.language`, args[1])

            message.channel.send(this.t("commands:Config.language.successSetNewValue", {
                language: args[1]
            }));
            break;
        case "info":

            let lang = this.client.db.guildconf.get(`${message.guild.id}.language`)||"en-US"
            if(this.client.languages.includes(args[1]||"null"))
                lang = args[1]

                console.log(this.t("about:name", {
                    lng: lang
                }))

            let embedinfo = new Discord.MessageEmbed()
.setDescription(this.t("commands:Config.language.infoEmbed", {
    name: this.t("about:name", {lng: lang})||"None",
    regionalName: this.t("about:regionalName", {lng: lang})||"None",
    identifier: this.t("about:code", {lng: lang})||"None",
    description: this.t("about:description", {lng: lang})||"None",
    contributors: this.t("about:contributors", {lng: lang, joinArrays:", "})||"no Contributors"
})).setColor("RED").setFooter("YouTube Bot", this.client.user.displayAvatarURL())

            message.channel.send(embedinfo)

            break;


        default:

            let deprecatedLang = Boolean(this.altlangs.includes(this.client.db.guildconf.get(`${message.guild.id}.language`)||"en-US"))

            if(deprecatedLang)
                message.channel.send(this.t("commands:Config.language.warningDeprecatedLang"))

            let embed = new Discord.MessageEmbed()
                .setDescription(this.t("commands:Config.language.defaultMessage", {
                    lang: this.client.db.guildconf.get(`${message.guild.id}.language`)||"en-US",
                    allLang: this.client.languages.join(", ")
                }))
                .setColor("DARK_RED")

            await message.channel.send(embed)

            break;
    }


    }

}

module.exports = Language;