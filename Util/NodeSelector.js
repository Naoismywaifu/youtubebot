/**
 * 
 * @param {Array} onlineNodes 
 * @param {Boolean} isPremium 
 */

function BestNode(queue, onlineNodes, isPremium) {
    if(isPremium){
        let nodes = onlineNodes.filter(n => Boolean(n.premium))
        
        if(!nodes.length)
            return onlineNodes[0]
       
    nodes.forEach(n => n.stats.players)

    let node = nodes.find(node => node.stats.players === Math.min.apply(null, nodes.map(n => node.stats.players)));
        
    return node;
        
    } else {
    let nodes = onlineNodes.filter(n => !n.premium)
        
    nodes.forEach(n => n.stats.players)

    let node = nodes.find(node => node.stats.players === Math.min.apply(null, nodes.map(n => node.stats.players)));
    return node;
    }
}

module.exports.BestNode = BestNode;