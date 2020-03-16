const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {



        if(args[0] === "day"){
            client.joker.dailyJoke().then((joke) => {
                let embed = new Discord.MessageEmbed()
                .setDescription("Daily Joke")
                .addField("Question", joke.question, false)
                .addField("Answer", `||${joke.answer}||`, false)
                .setFooter(`Youtube Bot`)
                message.channel.send(embed)
        })

        } else if(args[0] === "random"){
            client.joker.randomJoke().then((joke) => {
                let embed = new Discord.MessageEmbed()
                .setDescription("Joke")
                .addField("Question", joke.question, false)
                .addField("Answer", `||${joke.answer}||`, false)
                .setFooter(`id: #${joke.id} | Youtube Bot`)
                message.channel.send(embed)
            })
        } else {
            message.channel.send("Usage: yt*joke <random/day>")
        }
    



}

module.exports.help = {
    name: "joke",
    group: "Fun",
    botperms: [],
    usrperm: [],
    owneronly: false,
    usage: "joke",
    aliases: ["blague"],
    description: "get a joke from the blague.xyz api"
    }