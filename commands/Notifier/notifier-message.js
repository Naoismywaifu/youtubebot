const {MessageEmbed} = require("discord.js")
const Command = require("../../Base/Command");
Youtube = require("simple-youtube-api");

class NotifierMessage extends Command {


    constructor(client) {
        super(client, {
            name: "notifier-message",
            StaffOnly: true,
            guildOnly: true,
            aliases: ["notifiermessage", "notifymessage", "notify-message"],
        });
    }

    async run(message, args) {

        const filter = (m) => m.author.id === message.author.id,
            opt = { max: 1, time: 90000, errors: [ "time" ] };

        let embed = new MessageEmbed()
            .addField(this.t("commands:Notifier.notifier-message.info"), `\`\`\`${this.t("commands:Notifier.notifier-message.provide")}\`\`\``, true)
            .addField(this.t("commands:Notifier.notifier-message.placeholders"), `\`\`\`asciidoc
{youtuber.name} ::  ${this.t("commands:Notifier.notifier-message.ownerName")}
{video.url}     ::  ${this.t("commands:Notifier.notifier-message.videoURL")}
{video.title}   ::  ${this.t("commands:Notifier.notifier-message.videoTitle")}
{video.date}    ::  ${this.t("commands:Notifier.notifier-message.uploadDate")}
{emojis.youtube}::  ${this.t("commands:Notifier.notifier-message.youtubeEmoji")}
{guild.name}    ::  ${this.t("commands:Notifier.notifier-message.guildName")}
{guild.id}      ::  ${this.t("commands:Notifier.notifier-message.guildID")}
\`\`\``, true)
            .addField(this.t("commands:Notifier.notifier-message.exampleWord"), `\`\`\`${this.t("commands:Notifier.notifier-message.example")}\`\`\``, false)

        const msg = await message.channel.send({embeds: [embed]})

        let collected = await message.channel.awaitMessages(filter, opt).catch(() => {});
        if(!collected || !collected.first()){
            msg.delete()
            return message.channel.send(this.t("commands:Notifier.notifier-message.canceled"))
        }
        const confMessage = collected.first().content;
        if(confMessage === "cancel"){
            msg.delete()
            return msg.channel.send(this.t("commands:Notifier.notifier-message.canceled"));
        }
        this.client.db.notifier.set(`${message.guild.id}.message`, confMessage)

        msg.channel.send(this.t("commands:Notifier.notifier-message.success"))
    }


}

module.exports = NotifierMessage;