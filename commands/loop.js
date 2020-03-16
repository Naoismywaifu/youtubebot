const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send("❌ | no music playing in this server !")

    if(args[0]){

        if(args[0] === "on"){
            if(client.player.getQueue(message.guild.id).repeatMode) return message.channel.send("❌ | The bot is already in loop mode")

            client.player.setRepeatMode(message.guild.id, true);
            let song = await client.player.nowPlaying(message.guild.id);
            message.channel.send(`✅ | the loop mode in enabled for the song \`${song.name}\`\n⚠ the on/off is mandatory`);

        } else if(args[0] === "off"){
            if(!client.player.getQueue(message.guild.id).repeatMode) return message.channel.send("❌ | The bot is not in loop mode")

            let song = await client.player.nowPlaying(message.guild.id);
            message.channel.send(`✅ | the loop mode will no longer be activated for the song \`${song.name}\`\n⚠ the on/off is mandatory`);


        } else {
        let emeeebed = new Discord.MessageEmbed()
        .setDescription("Use: \nyt*loop on => enable the loop mode\nyt*loop off => disable the loop mode\n**you can use yt*loop without on/off instead**")   
        .setColor("RED")
        message.channel.send(emeeebed) 
        }

    } else {




    if(!client.player.getQueue(message.guild.id).repeatMode){


        client.player.setRepeatMode(message.guild.id, true);

        let song = await client.player.nowPlaying(message.guild.id);
        message.channel.send(`✅ | the loop mode in enabled for the song \`${song.name}\``);

        } else {


        client.player.setRepeatMode(message.guild.id, false);

        let song = await client.player.nowPlaying(message.guild.id);
        message.channel.send(`✅ | the loop mode will no longer be activated for the song \`${song.name}\``);

        }
    }


}

module.exports.help = {
    name: "loop",
    group: "Music",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "loop <on/off (mandatory)>",
    aliases: ["repéter", "repeatmode", "repeter", "replay"],
    description: "repeat the current music"
    }