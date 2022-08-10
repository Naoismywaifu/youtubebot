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
        const serverQueue = this.client.player.manager.players.get(message.guild.id);
        if (!serverQueue) return message.channel.send(this.t("commands:Music.emptyQueue"));
        let index = 0;

        message.channel.send({embeds : [new MessageEmbed().setDescription(`
${this.t("commands:Music.queue.currentqueue")}

${serverQueue.queue.size ? serverQueue.queue.map(songs => `**${++index}.** ${songs.title}`).splice(0, 10).join("\n") : "- " + serverQueue.queue.current.title} 
${serverQueue.queue.size <= 10 ? "" : this.t("commands:Music.queue.andmore", {
    number: serverQueue.queue.size - 10
})}

${this.t("commands:Music.queue.estimatedduration", {
    duration: ms(serverQueue.queue.size ?serverQueue.queue.map(s => s.duration).reduce((a, b) => a + b) : serverQueue.queue.current.duration, { long: true})||"Unfetchable"
        })}
`).setColor("RED").setFooter("YouTube Bot", this.client.user.displayAvatarURL())]});
    }

}

module.exports = Queue;