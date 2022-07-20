const prettyMilliseconds = require("pretty-ms");
const { Permissions } = require('discord.js');
let db = require("quick.db")


module.exports = {
    isGuildPremium(GuildID) {
        return Boolean(db.guildconf.get(`${GuildID}.premium`));
    },
    getPrefix(GuildID) {
        return db.guildconf.get(`${GuildID}.prefix`)||require("../config").PREFIX;
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
    isDJ(message) {
        if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return true;
        if(!db.guildconf.get(`${message.guild.id}.djrole`)){
            return true;
        } else {
            if(message.member.roles.cache.some(role => role.name === "DJ") || message.member.roles.cache.has(message.client.db.guildconf.get(`${message.guild.id}.djrole`))){
                return true;
            } else {
                return false;
            }
        }
    },
    isStaff(message) {
        if(db.guildconf.has(`${message.guild.id}.staffrole`)){
            let roleto = db.guildconf.get(`${message.guild.id}.staffrole`)
            if (message.member.roles.cache.has(roleto)) {
                return true;
            } else {
                return false;
            }
        } else {
            if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
                return true;
            } else {
                return false;
            }
        }
    },

    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    durationToMillis(dur) {
        return dur.split(":").map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
    },
    millisToDuration(ms) {
        return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
    },
    chunk(arr, size) {
        const temp = [];
        for (let i = 0; i < arr.length; i += size) {
            temp.push(arr.slice(i, i + size));
        }
        return temp;
    },
    isValidURL(url) {
        return /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i
            .test(url);
    },
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}