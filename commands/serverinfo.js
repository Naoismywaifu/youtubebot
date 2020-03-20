const Discord = require('discord.js')
const config = require("../config.json")
const package = require("../package.json")

exports.run = async (bot, message, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };
        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: 🌟 (VIP) U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };

message.guild.members.fetch().then(fetchedMembers => {
    const totalnobots = fetchedMembers.filter(member => !member.user.bot);
    const totalbots = fetchedMembers.filter(member => member.user.bot);
	// We now have a collection with all online member objects in the totalOnline variable



        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.IconURL)
            .addField("Name", message.guild.name, true)
            .addField("ID", message.guild.id, true)
            .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField("Region", region[message.guild.region], true)
            .addField("Total | Humans | Bots", `${message.guild.memberCount} | ${totalnobots.size} | ${totalbots.size}`, true)
            .addField("Verification Level", message.guild.verificationLevel, true)
            .addField("Channels", message.guild.channels.cache.size, true)
            .addField("Roles", message.guild.roles.cache.size, true)
            .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .setThumbnail(message.guild.iconURL)
            .setColor("BLUE")
            .setFooter("YouTube Bot")
        message.channel.send({embed});
    });  
}

    module.exports.help = {
        name: "serverinfo",
        group: "Core",
        botperms: [],
        usrperm: [],
        guildonly: true,
        cooldown: 5,
        owneronly: false,
        aliases: ["info-server", "server-info", "servinfo", "sinfo"],
        description: "Get some informations about your guild."
        }