const config = require("../config.json")
const db = require("quick.db");
const { relativeTimeRounding } = require("moment");
const { Message } = require("discord.js");
const { readdir } = require("fs");


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

 premium(message) {
    if(!message.guild) 
    return false;

    if(!db.guildconf.get(`${message.guild.id}.premium`)){
    return false;
    } else {
    return true;
    }
},

/**
 * 
 * @param {Message} message 
 * @returns {Boolean} true or false
 */
 
    isStaff(message) {
        if(message.client.db.guildconf.has(`${message.guild.id}.staffrole`)){
            let roleto = message.client.db.guildconf.get(`${message.guild.id}.staffrole`)
            if (message.member.roles.cache.has(roleto)) {
                return true;
            } else {
                return false;
            }
        } else {
            if(message.member.hasPermission("MANAGE_GUILD")){
                return true;
            } else {
                return false;
            }
        }
    },

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    async languages() {
        let files = await readdir("../languages/")

let langs = []

        files.forEach((file) => {
            let finfo = file.langinfos

            let constructor = {
                lang: finfo.lang,
                name: finfo.name,
                contributors: finfo.contributors,
                enabled: finfo.enabled
            }

            langs.push(constructor)

        })

        return langs;
    },

    isDJ(message) {
        if(message.member.hasPermission("ADMINISTRATOR")) return true;
        if(!message.client.db.guildconf.get(`${message.guild.id}.djrole`)){
            return true;
        } else {
        if(message.member.roles.cache.some(role => role.name === "DJ") || message.member.roles.cache.has(message.client.db.guildconf.get(`${message.guild.id}.djrole`))){
            return true;
        } else {
            return false;
        }
        }
    },
    
}
