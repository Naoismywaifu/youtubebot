const  Discord = require("discord.js")
const conf = require("../config.json")
const { version } = require("../package.json")


exports.run = (client, message, args) => {

let embed = new Discord.MessageEmbed()
.setTitle("Info - YouTube Bot")
.setDescription(`YouTube Bot is running on the version ${version}. you're running in the shard \`#${client.shard.ids[0] + 1}\` with a total of \`${conf.shards}\` shards`)
.setFooter("Youtube Bot")
.setColor("ORANGE")
message.channel.send(embed)
}


    module.exports.help = {
        name: "info",
        group: "Core",
        botperms: [],
        usrperm: [],
        owneronly: false,
        usage: "info",
        aliases: ["informations"],
        description: "Welcome ! get some informations about youtube bot !"
        }