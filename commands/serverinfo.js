const Discord = require('discord.js')
const config = require("../config.json")
const package = require("../package.json")

module.exports = {
    name: 'serverinfo',
    description: 'Show informations about the server.',
    cooldown: 15,
    guildOnly: true,
    ownerOnly: false,
    args: false,
    enabled: true,
    category: "Core",
    usage: '',
    aliases: ["infoguild", "guildinfo", "infoserver"],
    execute(client, message, args) {
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
            "europe": ":flag_eu: Europe",
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
            .addField(message.language.get("UTILS").NAME, message.guild.name, true)
            .addField(message.language.get("UTILS").ID, message.guild.id, true)
            .addField(message.language.get("UTILS").OWNER, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField(message.language.get("UTILS").REGION, region[message.guild.region], true)
            .addField(`${message.language.get("UTILS").TOTAL} | ${message.language.get("UTILS").HUMANS} | ${message.language.get("UTILS").BOTS}`, `${message.guild.memberCount} | ${totalnobots.size} | ${totalbots.size}`, true)
            .addField(message.language.get("UTILS").VERIFLEVEL, message.guild.verificationLevel, true)
            .addField(message.language.get("UTILS").CHANNELS, message.guild.channels.cache.size, true)
            .addField(message.language.get("UTILS").ROLES, message.guild.roles.cache.size, true)
            .addField(message.language.get("UTILS").CREATIONDATE, `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .setThumbnail(message.guild.iconURL)
            .setColor("BLUE")
            .setFooter("YouTube Bot")
        message.channel.send({embed});
    });  
}
}
