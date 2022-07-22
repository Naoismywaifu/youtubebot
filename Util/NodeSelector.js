const {Collection} = require("discord.js")
const Player = require("../Base/Player")
/**
 *
 * @param {Player} player
 * @param {Array} onlineNodes
 * @param {Boolean} isPremium
 */

function BestNode(nodes, isPremium) {
    let nodesLoad = [];
    let onlineNodes = nodes;

    console.log("IS PREMIUM ? "+isPremium)

    if(Boolean(isPremium)){
        console.log("IS PREMIUM")
        let nodes = onlineNodes.filter(n => Boolean(n.options.id.startsWith("Premium")));

        if(!nodes.length)
            return onlineNodes[0]

        nodes.forEach(node => {
            if(node.options.id.startsWith("Premium"))
            nodesLoad.push({
                name: node.options.id,
                identifier: node.options.identifier,
                load: node.stats.cpu.lavalinkLoad
            })
        })

        let n = nodesLoad.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.options.id === n.name)[0]||onlineNodes[0];

    } else {

        console.log("eee")

    let nodes = onlineNodes.filter(n => !Boolean(n.options.id.startsWith("Premium")))

        console.log(nodes)

        nodes.forEach(node => {
            console.log("Node" + node.toString())
            nodesLoad.push({
                name: node.options.id,
                identifier: node.options.identifier,
                load: node.stats.cpu.lavalinkLoad
            })
        })

        let n = nodesLoad.sort((a, b) => a.load - b.load)[0]

        console.log(n)

        console.log("selected node :"+  n.identifier)


        
        return n.identifier;
    }
}

module.exports.BestNode = BestNode;