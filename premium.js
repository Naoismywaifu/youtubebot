function premium(id, client) { 
return false;
/*
 client.shard.broadcastEval(`
  let g =  client.guilds.cache.get("372007536871866368")
  let user = client.users.cache.get(id)
  if(g && client.users.cache.get(id))
  if(g.member(user).roles.cache.get("565938460737929226")){
    return true;
  } else {
      return false;
  }
`).then(results => {
if(results.includes(true)){
  return true;
} else {
  return false;
}
})

*/
/*
  let g =  client.guilds.cache.get("372007536871866368")


if(!client.users.cache.get(id)) return false;

let user = client.users.cache.get(id);


  if(!g.member(user)) return false;
  if(g.member(user).roles.cache.get("565938460737929226")){
    return true;
  } else {
      return false;
  }

*/

}
exports.premium = premium;