const Discord = require("discord.js")
const config = require("../config.json")
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API_KEY);

module.exports = {
        name: 'activate',
        description: 'Get a premium from your premium licences wallet !',
        cooldown: 5,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Premium",
        usage: '',
        aliases: ["getpremium", "getPremium", "activer"],
        execute(client, message, args) {

            if(client.db.guildconf.get(`${message.guild.id}.premium`)) return message.channel.send(message.language.get("GETPREMIUM_ALREADY"))

            let premnb = client.db.users.get(`${message.author.id}.premiums`)||0

            if(premnb === 0 || premnb < 0) return message.channel.send(message.language.get("GETPREMIUM_NOPREMIUM"))

            client.db.users.subtract(`${message.author.id}.premiums`, 1)

            client.db.guildconf.set(`${message.guild.id}.premium`, true)

            message.channel.send(message.language.get("GETPREMIUM_SUCCESS"))

            }


        }