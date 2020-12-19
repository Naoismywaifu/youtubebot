const Command = require("../../Base/Command");
const Discord = require("discord.js")
const ms = require("ms")

class Nodes extends Command {

    constructor(client) {
        super(client, {
            name: "nodes",
            DJOnly: true,
            aliases: ["servers"],
        });

    }

    async run(message, args) {

        let m = await message.channel.send(this.t("commands:Core.nodes.fetching"))

        let totalPlaying = this.client.player.startedNodes.map(n => this.client.player.manager.nodes.get(n.id).stats.players).reduce((a, b) => a + b, 0)||0

        let embed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setDescription(this.t("commands:Core.nodes.embed.desc", {
                onlinenodes: this.client.player.startedNodes.length||0,
                totalnodes: this.client.player.manager.nodes.size||0,
                totalplaying: totalPlaying||0
            }))


        this.client.player.manager.nodes.forEach(node => {
            let isOnline = this.client.player.startedNodes.some(n => n.id === node.id)

            embed.addField(this.t("commands:Core.nodes.embed.nodeTitle", {
                status: isOnline ? "🟢" : "🔴",
                nodeID: node.id
            }), this.t("commands:Core.nodes.embed.nodeDetails", {
                status: isOnline ? this.t("commands:online") : this.t("commands:offline"),
                playing: node.stats.players||0,
                attributes: node.id.startsWith("Premium") ? "Premium Node ⭐" : this.t("commands:none"),
                uptime: ms(node.stats.uptime)
            }), true)
        })

        return m.edit("", {
            embed: embed
        })

    }

}

module.exports = Nodes;