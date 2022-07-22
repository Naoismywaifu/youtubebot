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

        let totalPlaying = this.client.player.manager.nodes.map(n => this.client.player.manager.nodes.get(n.options.identifier).stats.players).reduce((a, b) => a + b, 0)||0

        let embed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setDescription(this.t("commands:Core.nodes.embed.desc", {
                onlinenodes: this.client.player.manager.nodes.size||0,
                totalnodes: this.client.config.NODES.length||0,
                totalplaying: totalPlaying||0
            }))


            this.client.config.NODES.forEach(node => {
            let isOnline = this.client.player.manager.nodes.some(n => n.options.id === node.id)

            let gnode = this.client.player.manager.nodes.get(node.host)

            embed.addField(this.t("commands:Core.nodes.embed.nodeTitle", {
                status: isOnline ? "🟢" : "🔴",
                nodeID: node.id
            }), this.t("commands:Core.nodes.embed.nodeDetails", {
                status: isOnline ? this.t("commands:online") : this.t("commands:offline"),
                playing: gnode.stats.players||0,
                attributes: node.id.startsWith("Premium") ? "Premium Node ⭐" : this.t("commands:none"),
                uptime: ms(gnode.stats.uptime)
            }), true)
        })

        return m.edit({
            content: null,
            embeds: [embed]
        })

    }

}

module.exports = Nodes;