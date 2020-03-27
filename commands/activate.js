const Discord = require("discord.js")
const config = require("../config.json")
const {premium} = require("../premium")
exports.run = async (client, message, args) => {

let errguild = new Discord.MessageEmbed()
.setDescription("🛑 | Error: please execute this command in the support server ! [support server](https://discord.gg/C67wqwZ)")
.setColor("RED")
.setFooter("YouTube Bot")

let errnopremium = new Discord.MessageEmbed()
.setDescription("🛑 | Oops you're not premium ! you can't activate them ! to get premium licence join the [support server](https://discord.gg/C67wqwZ) and [become patreon](https://www.patreon.com/botyoutube)")
.setColor("RED")
.setFooter("YouTube Bot")

let embedsuccess = new Discord.MessageEmbed()
.setDescription("<a:Verified:677182501206097944> | Congratualtions you have been activated your licence for 1 month ! if you lost your youtube bot and you have the licence active, you have just to re-use  yt*activate !")
.setColor("GREEN")
.setFooter("YouTube Bot")

let checkpremium = await client.db.get(message.author.id)



           if(!client.users.cache.get(message.author.id)) return message.channel.send("hmm verry strange... where are you ?? i can't get your user")
           if(message.guild.id !== "372007536871866368") return message.channel.send(errguild)
        if(message.guild.member(message.author).roles.cache.get("565938460737929226")){
          message.channel.send("<a:loading:653279329022640128> connecting to the database to check your authancity").then((m) => {
            if(checkpremium){
                m.edit("❌ | Error: you're already premium !")
            } else {
                client.db.set(message.author.id, true, 30 * 24 * 60 * 60000)
                m.edit("", embedsuccess)
            }
          })
        } else {
            message.channel.send("<a:loading:653279329022640128> | checking licence...").then((m) => {
                m.edit("", errnopremium)
            })

        }

}

   module.exports.help = {
    name: "activate",
    group: "Premium",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "premium",
    aliases: ["activer"],
    description: "so exiting !!! activate youtube bot premium right now !"
    }

