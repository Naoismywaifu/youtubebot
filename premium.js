async function premium(id, client) { 
  
  let replypremium = await client.db.get(id)
  if(replypremium === true){
    return true;
  } else {
    return false;
  }

  

}
exports.premium = premium;