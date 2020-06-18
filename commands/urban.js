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
        execute(client, message, args) {

            
                const query = querystring.stringify({ term: args.join(' ') });
            
              const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
              
              if (!list.length) {
                return message.channel.send(`❌ | No results found for **${args.join(' ')}**.`);
            }
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        
        
              const [answer] = list;
        
              const embed = new Discord.MessageEmbed()
                  .setColor('RED')
                  .setTitle(answer.word + " - Youtube Bot")
                  .setURL(answer.permalink)
                  .addFields(
                      { name: 'Definition', value: trim(answer.definition, 1024) },
                      { name: 'Example', value: trim(answer.example, 1024) },
                      { name: 'Rating', value: `${answer.thumbs_up} <:like:719487585881423953> | ${answer.thumbs_down} <:dislike:716351395393175623>` }
                  );
              
              message.channel.send(embed);
        
        

            }


        }