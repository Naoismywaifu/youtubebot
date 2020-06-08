cheerio = require("cheerio"),
fetch = require("node-fetch");
const Discord = require('discord.js');
module.exports = {
    name: 'lyrics',
    description: 'get lyrics of a song.',
    cooldown: 15,
    guildOnly: false,
    ownerOnly: false,
    args: true,
    enabled: true,
    category: "Core",
    usage: '<song>',
    aliases: ["paroles"],
    async execute(client, message, args) {

    let songName = args.join(" ");
    if(!songName){
        return message.channel.send("🛑 | Please include the name of the music !");
    }
    
    let embed = new Discord.MessageEmbed()
        .setAuthor("Youtube Bot - Lyrics")

    try {

        let songNameFormated = songName
        .toLowerCase()
        .replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
        .split(" ").join("%20");

        let res = await fetch(`https://www.musixmatch.com/search/${songName}`);
        res = await res.text();
        let $ = await cheerio.load(res);
        let songLink = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;

        res = await fetch(songLink);
        res = await res.text();
        $ = await cheerio.load(res);

        let lyrics = await $("p[class=\"mxm-lyrics__content \"]").text();

        if(!lyrics.length) {
            return message.channel.send("❌ | i can't find any lyrics for this music !")
        }

        embed.setDescription(lyrics.slice(0, 1024));
        embed.setColor("RED")
        embed.setFooter("Youtube bot")
        embed.setTimestamp()
        message.channel.send(embed);

    } catch(e){
        console.log(e)
        return message.channel.send("❌ | i can't find any lyrics for this music !")
    }

}

}