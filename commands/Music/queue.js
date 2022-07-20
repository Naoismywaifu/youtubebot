const Command = require("../../Base/Command");
const {MessageEmbed} = require("discord.js");
const ms = require("ms")

class Queue extends Command {

    constructor(client) {
        super(client, {
            name: "queue",
            DJOnly: true,
            guildOnly: true,
            aliases: ["q"],
        });
    }

    async run(message, args) {
        const serverQueue = this.client.player.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        let index = 0;

        message.channel.send({embeds : [new MessageEmbed().setDescription(`
${this.t("commands:Music.queue.currentqueue")}

${serverQueue.songs.map(songs => `**${++index}.** ${songs.info.title}`).splice(0, 10).join("\n")}
${serverQueue.songs.length <= 10 ? "" : this.t("commands:Music.queue.andmore", {
    number: serverQueue.songs.length - 10
})}

${this.t("commands:Music.queue.estimatedduration", {
    duration: ms(serverQueue.songs.map(s => s.info.length).reduce((a, b) => a + b), { long: true})||"Unfetchable"
        })}
`).setColor("RED").setFooter("YouTube Bot", this.client.user.displayAvatarURL())]});
    }

}

module.exports = Queue;