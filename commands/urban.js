const Discord = require("discord.js")
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
        name: 'urban',
        description: 'search terms from the urban dictionary',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: true,
        enabled: true,
        category: "Core",
        usage: '<term>',
        aliases: ["urbain"],
       async execute(client, message, args) {

            
                const query = querystring.stringify({ term: args.join(' ') });
            
              const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
              
              if (!list.length) {
                return message.channel.send(message.language.get("URBAN_NOTFOUND", args.join(' ')));
            }
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        
        
              const [answer] = list;
        
              const embed = new Discord.MessageEmbed()
                  .setColor('RED')
                  .setTitle(answer.word + " - Youtube Bot")
                  .setURL(answer.permalink)
                  .addFields(
                      { name: message.language.get("URBAN_DEF"), value: trim(answer.definition, 1024) },
                      { name: message.language.get("URBAN_EXAMPLE"), value: trim(answer.example, 1024) },
                      { name: message.language.get("URBAN_RATING"), value: `${answer.thumbs_up} <:like:719487585881423953> | ${answer.thumbs_down} <:dislike:719487584031735879>` }
                  );
              
              message.channel.send(embed);
        
        

            }


        }