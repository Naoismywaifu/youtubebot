const Command = require("../../Base/Command");
const {MessageEmbed} = require("discord.js")
const fetch = require("node-fetch")
const querystring = require('querystring');

class Urban extends Command {

    constructor(client) {
        super(client, {
            name: "urban",
            aliases: ["urbandic"],
        });
    }

    async run(message, args) {

         if (!args.length) {
                return message.channel.send(this.t("commands:Fun.urban.noArgs"));
            }

            let query = querystring.stringify({ term: args.join(' ') });

            let { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

            if(!list)
                return message.channel.send(this.t("commands:Fun.urban.noFound"))

        let [answer] = list;

        let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: this.t("commands:Fun.urban.def"), value: this.trim(answer.definition, 1024)||this.t("commands:Fun.urban.notProvided") },
                     { name: this.t("commands:Fun.urban.example"), value: this.trim(answer.example, 1024)||this.t("commands:Fun.urban.notProvided") }
            )
            .setFooter(this.t("commands:Fun.urban.footer", {
                up:answer.thumbs_up,
                down: answer.thumbs_down
            }))

        message.channel.send({embeds: [embed]});


        }
    trim(str, max) {
        return ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
    }




}

module.exports = Urban;