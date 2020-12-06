const {Collection} = require("discord.js")
/**
 *
 * @param {Collection} queue
 * @param {Array} onlineNodes
 * @param {Boolean} isPremium
 */

function BestNode(queue, onlineNodes, isPremium) {
    let nodesload = []
    if(isPremium){
        let nodes = onlineNodes.filter(n => Boolean(n.premium))
        nodes.forEach(n => nodesload.push({ name: n.id, load: 0}))


        if(!nodes.length)
            return onlineNodes[0]

        queue.each(q => {
            if(nodesload.some(n => n.name === q.node)) {
                nodesload.filter(n => n.name === q.node)[0].load++
            } else {
                if(q.node.startsWith("Premium"))
                    nodesload.push({
                        name: q.node,
                        load: 1
                    })
            }
        })

        let n = nodesload.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||onlineNodes[0];
        
    } else {

    let nodes = onlineNodes.filter(n => !n.premium)
        nodes.forEach(n => nodesload.push({ name: n.id, load: 0}))

        queue.each(q => {
            if(nodesload.some(n => n.name === q.node)) {
                nodesload.filter(n => n.name === q.node)[0].load++
            } else {
                if(q.node.startsWith("Free"))
                nodesload.push({
                    name: q.node,
                    load: 1
                })
            }
        })

        let n = nodesload.sort((a, b) => a.load - b.load)[0]

        return onlineNodes.filter(nodeuh => nodeuh.id === n.name)[0]||onlineNodes[0];
    }
}

module.exports.BestNode = BestNode;