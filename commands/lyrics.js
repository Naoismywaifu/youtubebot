cheerio = require("cheerio"),
fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
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

        if(lyrics.length > 2048) {
            lyrics = lyrics.substr(0, 2031) + message.language.get("LYRICS_NEXT", `https://www.musixmatch.com/search/${songName}`);
        } else if(!lyrics.length) {
            return message.channel.send("❌ | i can't find any lyrics for this music !")
        }

        embed.setDescription(lyrics);
        embed.setColor("RED")
        embed.setFooter("Youtube bot")
        embed.setTimestamp()
        message.channel.send(embed);

    } catch(e){
        return message.channel.send("❌ | i can't find any lyrics for this music !")
    }

}


module.exports.help = {
    name: "lyrics",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "lyrics <Despacito>",
    aliases: ["lyric", "paroles"],
    description: "fetch lyrics for a music"
    }