const ms = require("ms"); 
const config = require("../config.json")

exports.run = (client, message, args) => {


    if(!message.member.roles.cache.some(role => role.name === 'GIVEAWAYS')){
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send("🛑 | this command is only for users with the permission 'MANAGE_GUILD' or users with a role named 'GIVEAWAYS' (case sensitive)")
        }
        }


    if(!args[0]) return message.channel.send("❌ | Error: please add the giveway's message id to reroll")


            let messageID = args[0];
            client.giveawaysManager.reroll(messageID).then(() => {
                message.channel.send("✅ |  Giveaway re-rolled !");
            }).catch((err) => {
                message.channel.send("❌ | No giveaway found for "+messageID+", please check and try again");
            });
        }
    
        module.exports.help = {
            name: "greroll",
            group: "Giveaways",
            botperms: [],
            usrperm: [],
            owneronly: false,
            usage: "greroll (message id)",
            aliases: ["grrll", "reroll", "grroll"],
            description: "Hmmm, the winner don't have requirements ? execute this command to re take someone"
            }

