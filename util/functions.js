const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")


module.exports = {

async prefix(message) {
    if(!message) 
    return config.PREFIX;

    if(!message.guild)
    return config.PREFIX;

    if(!db.guildconf.has(`${message.guild.id}.prefix`))
    return config.PREFIX;

    return db.guildconf.get(`${message.guild.id}.prefix`)
},

async premium(guild) {
    if(!guild) 
    return false;

    if(!db.guildconf.get(`${guild.id}.premium`)){
    return false;
    } else {
    return true;
    }
},


    async isDJ(message) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            if(message.client.db.guildconf.get(`${message.author.id}.djrole`) && message.member.roles.cache.some(role => role.name === 'DJ')){
                return true;
            } else {
                if(!message.client.db.guildconf.get(`${message.author.id}.djrole`)){
                    return true;
                } else {
                return false;
                }
            }
        } else {
            return true;
        }
    },

    async isStaff(message) {
        return message.member.hasPermission("MANAGE_GUILD");
    },

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    
}
