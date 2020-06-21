const Discord = require("discord.js")
const radios = require("../assets/radios.json")
module.exports = {
        name: 'radio',
        description: 'Play a radio with youtube bot. (24/7)',
        cooldown: 5,
        guildOnly: true,
        ownerOnly: false,
        premiumOnly: true,
        DJOnly: true,
        args: false,
        enabled: true,
        category: "Radio",
        usage: '<radio name>',
        aliases: ["radios", "playradio", "play-radio"],
        async execute(client, message, args) {


            if(!args[0]){
    let embed = new Discord.MessageEmbed()
    .setTitle("Radio - YouTube Bot")
    .setDescription(message.language.get("RADIO_EXPL"))
        for(var fxes in radios) {
            embed.addField(fxes, `${message.language.get('UTILS').LANGUAGE}: \`${radios[fxes].lang}\`\n[url](${radios[fxes].url})`)
        }

        message.channel.send(embed)

    } else {



        let rid = args[0]



        if(!radios[rid]) return message.channel.send(message.language.get("RADIO_EXISTNO"))
            if (!message.member.voice.channel) return message.reply(message.language.get("MUSIC_NO_CHANNEL"));
            const permissions = message.member.voice.channel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT"))
              return message.channel.send(message.language.get("PLAY_PERM_CONNECT"));
            if (!permissions.has("SPEAK"))
              return message.channel.send(message.language.get("PLAY_PERM_SPEAK"));
        
                const connection = await message.member.voice.channel.join();

                connection.play(radios[rid].url, {
                    volume: 1,
                  })

                  client.radiomanager.set(message.guild.id, {
                    "playing": true,
                    "guild": message.guild.id,
                    "url": radios[rid].url,
                    "voicechannel": message.member.voice.channel.id,
                    "title":rid
                })
                  

                message.channel.send(message.language.get("RADIO_SUCCESS", rid))
                  



            





    }

        },

    }
