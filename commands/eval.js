const Discord = require("discord.js")
const config = require("../config.json")
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY);

module.exports = {
        name: 'eval',
        description: 'make tests !',
        cooldown: 5,
        guildOnly: false,
        ownerOnly: true,
        args: true,
        enabled: true,
        category: "Owner",
        usage: '<command>',
        aliases: ["evaluation"],
        execute(client, message, args) {

          let start = Date.now()


          const content = message.content.split(" ").slice(1).join(" ");
          const result = new Promise((resolve, reject) => resolve(eval(content)));
          
          return result.then((output) => {
              if(typeof output !== "string"){
                  output = require("util").inspect(output, { depth: 0 });
              }
              if(output.includes(message.client.token)){
                  output = output.replace(message.client.token, "T0K3N");
              }


              if(output.length >= 1024){
                console.log(`Eval output: ${output}`)
                output = "The output is too long, the output is logged in console"
            }


              let end = Date.now()

              let timeelipsed = end - start



              let emb = new Discord.MessageEmbed()
              .setDescription(`\`\`\`${output}\`\`\``)
              .addField("executed in", `${timeelipsed} ms`, true)
              .addField("Type", typeof output, true)
              .setColor("GREEN")

              message.channel.send(emb)
          }).catch((err) => {
              err = err.toString();
              if(err.includes(message.client.token)){
                  err = err.replace(message.client.token, "T0K3N");
              }

              let emberr = new Discord.MessageEmbed()
              .setDescription(`\`\`\`${err}\`\`\``)
              .setColor("RED")

              message.channel.send(emberr);
          });

        }


        }