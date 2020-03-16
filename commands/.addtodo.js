const ms = require("ms"); 
const Discord = require("discord.js")
const config = require("../config.json")

exports.run = (client, message, args) => {
/*
if(!message.guild.id === "372007536871866368") return message.channel.send("this command is for the bot's support only")
if(!message.author.id === "355995885085392896") return message.channel.send("this command is for the bot developer only")
if(!args[0]) return message.channel.send("please include what i must add")
let messagetodo = client.channels.get(677252321876377627)
messagetodo.fetchMessage(677260389028724775).then((m) => {
var currentdate = new Date(); 
var datetime = "[" + currentdate.getHours() + ":"  
                     + currentdate.getMinutes() + ":" 
                     + currentdate.getSeconds() + "]";
m.edit(m.content + `\n[${datetime}] ↪ ${args.join(" ")}`)
})
*/
}

module.exports.help = {
    name: "addtodo",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "addtodo <new todo task>",
    aliases: [],
    description: "(internal command) command used for adding todo task on the support server"
    }