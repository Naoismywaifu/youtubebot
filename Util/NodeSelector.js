const {Collection} = require("discord.js")
const Player = require("../Base/Player")
/**
 *
 * @param {Player} player
 * @param {Array} onlineNodes
 * @param {Boolean} isPremium
 */

function BestNode(player, isPremium) {
    let nodesload = [];
    let onlineNodes = player.startedNodes;

    if(isPremium){
        let nodes = onlineNodes.filter(n => Boolean(n.premium))
        nodes.forEach(n => nodesload.push({ name: n.id, load: 0}))

        if(!nodes.length)
            return onlineNodes[0]

        nodes.forEach(node => {
            if(node.id.startsWith("Premium"))
            nodesload.push({
                name: node.id,
                load: player.manager.nodes.get(node.id).stats.players||0
            })
        })

        let n = nodesload.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||onlineNodes[0];

    } else {

    let nodes = onlineNodes.filter(n => !n.premium)

        nodes.forEach(node => {
            nodesload.push({
                name: node.id,
                load: player.manager.nodes.get(node.id).stats.players||0
            })
        })

        let n = nodesload.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||onlineNodes[0];
    }
}

module.exports.BestNode = BestNode;