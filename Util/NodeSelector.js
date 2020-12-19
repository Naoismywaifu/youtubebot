const {Collection} = require("discord.js")
const Player = require("../Base/Player")
/**
 *
 * @param {Player} player
 * @param {Array} onlineNodes
 * @param {Boolean} isPremium
 */

function BestNode(player, isPremium) {
    let nodesLoad = [];
    let onlineNodes = player.startedNodes;

    if(isPremium){
        let nodes = onlineNodes.filter(n => Boolean(n.premium))

        if(!nodes.length)
            return onlineNodes[0]

        nodes.forEach(node => {
            if(node.id.startsWith("Premium"))
            nodesLoad.push({
                name: node.id,
                load: player.manager.nodes.get(node.id).stats.players||0
            })
        })

        let n = nodesLoad.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||onlineNodes[0];

    } else {

    let nodes = onlineNodes.filter(n => n.premium === false)

        nodes.forEach(node => {
            nodesLoad.push({
                name: node.id,
                load: player.manager.nodes.get(node.id).stats.players||0
            })
        })

        let n = nodesLoad.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||nodes[0];
    }
}

module.exports.BestNode = BestNode;