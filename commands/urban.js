const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {


    if (!args.length) {
        return message.channel.send('🛑 | You need to supply a search term!');
      }
    
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
              { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
          );
      
      message.channel.send(embed);


}

module.exports.help = {
    name: "urban",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "urban <term>",
    aliases: ["urbain"],
    description: "search terms from the urban dictionary"
    }
