const  Discord = require("discord.js")
const conf = require("../config.json")
const { version } = require("../package.json")


exports.run = (client, message, args) => {

    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
    ];
    
    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
            const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
            
        

let embed = new Discord.MessageEmbed()
.setTitle("Info - YouTube Bot")
.setDescription(`YouTube Bot is running on the version \`${version}\`.\n You're running in the shard \`#${client.shard.ids[0] + 1}\` with a total of \`${conf.shards}\` shards\n thanks for using YouTube Bot ! \n i'm powering \`${totalGuilds}\` communities with a total of \`${totalMembers}\` users\n want to donate ? check [our patreon page](https://patreon.com/botyoutube)\nWant to vote ? check  our [vote page](https://top.gg/bot/486948160124485642/vote) to get a lot of freatures in plus !`)
.setFooter("Youtube Bot")
.setColor("ORANGE")
message.channel.send(embed)

})
.catch(console.error);


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