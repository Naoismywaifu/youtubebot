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

            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }

              try {

                const code = args.join(" ");
                let evaled = eval(code);




                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
                var embed = new Discord.MessageEmbed()
                .setTitle("Evaluation")
                .addField("input", code, {code:"xl"})
                .addField("output", clean(evaled), {code:"xl"})
                .setColor("GREEN")
                message.channel.send(embed);
              } catch (err) {
                const code = args.join(" ");
                var embed = new Discord.MessageEmbed()
                .setTitle(`Evaluation - ${message.language.get("UTILS").ERROR}`)
                .addField("input", code, {code:"xl"})
                .addField("error", clean(err), {code:"xl"})
                .setColor("RED")
                message.channel.send(embed);
              }
            }


        }