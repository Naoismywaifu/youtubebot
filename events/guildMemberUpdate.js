const Discord = require("discord.js")
const { SUPPORT_SERVER_ID, PREMIUM_ROLE } = require("../config.json")

exports.run = async (client, oldMember, newMember) => {
    

if(oldMember.guild.id === SUPPORT_SERVER_ID && newMember.guild.id === SUPPORT_SERVER_ID){

    const addedRoles = []
    newMember.roles.cache.forEach(role => {
        if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role.id);
    });

    if(addedRoles.includes(PREMIUM_ROLE)){
        client.db.users.add(`${newMember.id}.premiums`, 1)
        const hook = new Discord.WebhookClient("722479029344796702", "6ROO259rnz9qvTC9IHb3Fou1JTJ2GgWiKenwTu487NjMEslyY8p1fjY-PrY3lZ7wsnno")
        hook.send(`${newMember.user.username} just get +1 premium server, congratulations !`)
        newMember.roles.remove(PREMIUM_ROLE, "just putting it with the real premium role")
        newMember.roles.add("718424869406113824", "added the real premium role")
    }
}



}