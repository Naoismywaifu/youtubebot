const Discord = require("discord.js")
const Command = require("../../Base/Command");
const { KSoftClient } = require('@ksoft/api');

class Lyrics extends Command {

        constructor(client) {
            super(client, {
                name: "lyrics",
                aliases: [],
                botPerms:["ADD_REACTIONS"]
            });
        }

        async run(message, args) {

                let song;
                if (!args[0])
                    return message.channel.send(this.t("commands:Music.lyrics.noArgs"))

                song = args.join(" ")

                let ksoft = new KSoftClient(this.client.config.KSoftAPI);

                try {
                    console.log(song)
                    let results = await ksoft.lyrics.get(song, { textOnly: true });
                    console.log(results);
                    // Must make sure that description is less than 2048 characters
                    const embed = new Discord.MessageEmbed()
                        .setColor(2067276)
                        .setTitle(results.name)
                        .setURL(results.url)
                        .setDescription(results.lyrics.substring(0, 2048))

                    await message.channel.send(embed).then(async function(msg) {
                        if (results.lyrics.length < 2048) return;

                        // send reactions so user can see more lyrcis
                        await msg.react('⬆');
                        await msg.react('⬇');
                        // get collector
                        let page = 0;
                        const filter = (reaction, user) => {
                            return ['⬆', '⬇'].includes(reaction.emojis[0].name) && !user.bot;
                        };
                        const collector = msg.createReactionCollector(filter, { time: 240000 });
                        collector.on('collect', (reaction) => {
                            const totalpages = (Math.ceil(results.lyrics.length / 2048) - 1);
                            if (reaction.emojis[0].name === '⬆') {
                                // back page
                                page = page - 1;
                                if (page <= 0) page = 0;
                                if (page >= totalpages) page = totalpages;
                                this.Page(page, msg, results);
                            } else {
                                // forward page
                                page = page + 1;
                                if (page <= 0) page = 0;
                                if (page >= totalpages) page = totalpages;
                                this.Page(page, msg, results);
                            }
                        });
                    });
                } catch(e) {
                    message.channel.send(this.t("commands:Music.lyrics.errorOccurred", {
                        err: e.message
                    }));
                }
        }

    Page(page, message, results) {
        if (page == 0) {
            const embed = new Discord.MessageEmbed()
                .setColor(2067276)
                .setTitle(results.name)
                .setURL(results.url)
                .setDescription(results.lyrics.substring(0, 2048))
                message.edit(embed);
        } else {
            const num1 = (page * 2048);
            const num2 = num1 + 2048;
            const embed = new Discord.MessageEmbed()
                .setColor(2067276)
                .setTitle(results.name)
                .setURL(results.url)
                .setDescription(results.lyrics.substring(num1, num2))
            message.edit(embed);
        }
    }

    }

    module.exports = Lyrics;