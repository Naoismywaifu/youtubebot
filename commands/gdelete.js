const ms = require("ms"); 
const config = require("../config.json")

exports.run = (client, message, args) => {


    if(!message.member.roles.cache.some(role => role.name === 'GIVEAWAYS')){
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send("🛑 | this command is only for users with the permission 'MANAGE_GUILD' or users with a role named 'GIVEAWAYS' (case sensitive)")
        }
        }


    if(!args[0]) return message.channel.send("❌ | Error: please add the giveway's message id to delete it")


        let messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send("✅ | Success ! Giveaway deleted!");
        }).catch((err) => {
            message.channel.send("❌ | Oh no ! giveaway found for "+messageID+", please check and try again");
        });
    }

    module.exports.help = {
        name: "gdelete",
        group: "Giveaways",
        botperms: [],
        usrperm: [],
        owneronly: false,
        usage: "gdelete (message id)",
        aliases: ["gd"],
        description: "Delete a giveaway."
        }