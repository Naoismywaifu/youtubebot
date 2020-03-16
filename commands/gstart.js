const ms = require("ms"); 
const config = require("../config.json")
const { premium } = require("../premium")

exports.run = (client, message, args) => {

    if(premium(message.author.id, client)) {
        var ppremium = true
    } else {
        var ppremium = false
    }
    if(!args[0]) return message.channel.send("❌ | Error: please add when the giveaway will finish (ex: " + config.prefix + "gstart <time>(s/m/d/w) <winners> a awesome sweat)")
    if(!args[1]) return message.channel.send("❌ | Error: please add how many winners i will pick (ex: " + config.prefix + "gstart <time>(s/m/d/w) <winners> a awesome sweat)")
    if(isNaN(args[1])) return message.channel.send("❌ | Error: please add a valid number of winners")

    if((args[1] > 5) && !ppremium) return message.channel.send("🛑 | Error: you can have more than 5 winners, you must be premium to have more than 5 winners")
    
    let giveawayCount = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id).length;
        if((giveawayCount >= 3) && !ppremium){
        return message.channel.send("🛑 | Error: you can't create more than 3 giveaways on the same time, you must be premium to have more than 3 giveaways");
    } else {

        let timelimitfree = ms('3 days')
        if((ms(args[0]) >= timelimitfree) && !ppremium){
        return message.channel.send("🛑 | Error: you can't create giveaways who are more than 3 days ago, you must be premium for up to 1 year");
    } else {

        let timepremium = ms('365 days')

if(giveawayCount >= 15) return message.channel.send("🛑 | Oops you have reached the giveaways limit, if it's verry important for you to get more than `15` giveaways please contact our staff")
if((ms(args[0]) >= timepremium)) return message.channel.send("🛑 | Oops you have reached the time limit, if it's verry important for you to get more than `1` year please contact our staff")
if(args[1] > 50) return message.channel.send("🛑 | Oops you have reached the winners limit (50 winners), if it's verry important for you please contact our staff")



        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "@everyone\n\n🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "@everyone\n\n🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "🎊 Congratulations {winners} ! 🎊 You won **{prize}**!",
                embedFooter: "YouTube-Bot ∘ Giveaways",
                noWinner: "🛑 Giveaway cancelled, no valid participations.",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        }).then((gData) => {

        });
    }
}// And the giveaway has started!
    }

    module.exports.help = {
        name: "gstart",
        group: "Giveaways",
        botperms: [],
        usrperm: [],
        owneronly: false,
        usage: "gstart (time) (winners) (prize)",
        aliases: ["startg", "giveawaystart", "giveaway-start"],
        description: "spoof start a giveaway to give to your community a awesome gift"
        }