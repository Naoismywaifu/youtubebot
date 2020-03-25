const ms = require("ms"); 
const config = require("../config.json")
const funcraft = require("funcraft")
const Discord = require("discord.js")
exports.run = (client, message, args) => {

    if(args[0] === "all"){
        if(args[1]){
            //  showing global stats of a player of funcraft


            funcraft.fetchPlayer(args[1]).then((player) => {
                var embed = new Discord.MessageEmbed()
                .setTitle("Funcraft Global stats")
                .setDescription(`Username: \`${player.username}\` // first connexion: \`${player.registeredAt}\` // last connexion: \`${player.lastConnection}\` // total gloires: \`${player.gloryCount}\` // total games played: \`${player.gameCount}\` // banned ? \`${player.banned}\``)
                .addField("<a:fc_freecube:690893394293162044> | FreeCube", `No data avalable`)
                .addField("⚔️ | Rush", `Points: \`${player.rush.points}\`
                Games \`${player.rush.gameCount}\`
                Victories: \`${player.rush.victoryCount}\`
                defeats: \`${player.rush.defeatCount}\`
                Duration: \`${player.rush.gameTime}\`
                Kills: \`${player.rush.killCount}\`
                Deaths: \`${player.rush.deathCount}\`
                Destroyed beds: \`${player.rush.destroyedBedCount}\``, true)
                .addField("<:fc_sandstone:690894179550756925> | HikaBrain", `Points: \`${player.hikaBrain.points}\`
                Games \`${player.hikaBrain.gameCount}\`
                Victories: \`${player.hikaBrain.victoryCount}\`
                defeats: \`${player.hikaBrain.defeatCount}\`
                Duration: \`${player.hikaBrain.gameTime}\`
                Kills: \`${player.hikaBrain.killCount}\`
                Deaths: \`${player.hikaBrain.deathCount}\``, true)
                .addField("🎴 | SkyWars", `Points: \`${player.skywars.points}\`
                Games \`${player.skywars.gameCount}\`
                Top 1: \`${player.skywars.top1Count}\`
                Duration: \`${player.skywars.gameTime}\`
                Kills: \`${player.skywars.killCount}\`
                Deaths: \`${player.skywars.deathCount}\``, true)
                .addField("🛑 | Octogone", `Points: \`${player.octogone.points}\`
                Games \`${player.octogone.gameCount}\`
                Top 1: \`${player.octogone.top1Count}\`
                Duration: \`${player.octogone.gameTime}\`
                Kills: \`${player.octogone.killCount}\`
                Deaths: \`${player.octogone.deathCount}\`
                Damages: \`${player.octogone.damageCount}\``, true)
                .addField("🏘 | blitz", `Points: \`${player.blitz.points}\`
                Games \`${player.blitz.gameCount}\`
                Victories: \`${player.blitz.victoryCount}\`
                Duration: \`${player.blitz.gameTime}\`
                Victories: \`${player.blitz.victoryCount}\`
                Defeats: \`${player.blitz.defeatCount}\`
                Kills: \`${player.blitz.killCount}\`
                Deaths: \`${player.blitz.deathCount}\`
                Damages: \`${player.blitz.nexusDamageCount}\``, true)
                .addField("🎆 | ShootCraft", `Points: \`${player.shootCraft.points}\`
                Games \`${player.shootCraft.gameCount}\`
                Top 1: \`${player.shootCraft.top1Count}\`
                Duration: \`${player.shootCraft.gameTime}\`
                Kills: \`${player.shootCraft.killCount}\`
                Deaths: \`${player.shootCraft.deathCount}\``, true)
                .addField("🧟‍♂️ | Infected", `Points: \`${player.infecte.points}\`
                Games \`${player.infecte.gameCount}\`
                Victories: \`${player.infecte.victoryCount}\`
                Duration: \`${player.infecte.gameTime}\`
                Kills: \`${player.infecte.killCount}\`
                Deaths: \`${player.infecte.deathCount}\``, true)
                .addField("💥 | Survival", `Points: \`${player.survival.points}\`
                Games \`${player.survival.gameCount}\`
                Top 1: \`${player.survival.top1Count}\`
                Duration: \`${player.survival.gameTime}\`
                Kills: \`${player.survival.killCount}\`
                Deaths: \`${player.survival.deathCount}\``, true)
                .addField("🤺 | PvpSmash", `Points: \`${player.pvPSmash.points}\`
                Games \`${player.pvPSmash.gameCount}\`
                Top 1: \`${player.pvPSmash.top1Count}\`
                Duration: \`${player.pvPSmash.gameTime}\`
                Kills: \`${player.pvPSmash.killCount}\`
                Deaths: \`${player.pvPSmash.deathCount}\`
                Damage \`${player.pvPSmash.damageCount}\``, true)
                .addField("🗻 | LandRush", `Points: \`${player.landRush.points}\`
                Games \`${player.landRush.gameCount}\`
                Victories: \`${player.landRush.victoryCount}\`
                defeats: \`${player.landRush.defeatCount}\`
                Duration: \`${player.landRush.gameTime}\`
                Kills: \`${player.landRush.killCount}\`
                Deaths: \`${player.landRush.deathCount}\`
                Destroyed beds: \`${player.landRush.destroyedBedCount}\``, true)
                .setThumbnail(player.avatar)
                .setFooter("YouTube Bot | Statistics")
                message.channel.send(embed)
            /*
        landRush: {
            points: 0,
            gameCount: 0,
            victoryCount: 0,
            defeatCount: 0,
            gameTime: 0,
            killCount: 0,
            deathCount: 0,
            destroyedBedCount: 0
            */

            }).catch(err => message.channel.send(`:x: | Error: this player don't exist !`) && console.log(err));
        } else {
            funcraft.fetchPlayerCounts().then((counts) => {
            var embed = new Discord.MessageEmbed()
            .setTitle("Funcraft Global stats")
            .setDescription(`ip: \`funcraft.net\`\nplayers: \`${counts.totalOnline}\` (record: \`${counts.recordPlayerOnline}\`) \ntotal players: \`${counts.registeredPlayers}\` // premium players: \`${counts.premiumUsers}\` // non-premium players: \`${counts.nonPremiumUsers}\``)
            .addField("<a:fc_freecube:690893394293162044> | FreeCube", `\`${counts.freecube}\``)
            .addField("⚔️ | Rush", `\`${counts.rush}\``)
            .addField("<:fc_sandstone:690894179550756925> | HikaBrain", `\`${counts.hikabrain}\``)
            .addField("🎴 | SkyWars", `\`${counts.skywars}\``)
            .addField("🧟‍♂️ | Infected", `\`${counts.infecte}\``)
            .addField("❓ | other/lobby", `\`${counts.others}\``)
            .setThumbnail("https://pbs.twimg.com/profile_images/1083667374379855872/kSsOCKM7.jpg")
            .setFooter("YouTube Bot | Statistics")
            message.channel.send(embed)
            })
        }
    } else if(args[0]){
        if(args[1]){
            let game = (args[0]).toLowerCase()
            funcraft.fetchPlayer(args[1]).then((player) => {
            switch (game) {
                case "rush":
                    var embed = new Discord.MessageEmbed()
                    .setTitle("Rush - YouTube Bot")
                    .setDescription(`Points: \`${player.rush.points}\`
                    Games \`${player.rush.gameCount}\`
                    Victories: \`${player.rush.victoryCount}\`
                    defeats: \`${player.rush.defeatCount}\`
                    Duration: \`${player.rush.gameTime}\`
                    Kills: \`${player.rush.killCount}\`
                    Deaths: \`${player.rush.deathCount}\`
                    Destroyed beds: \`${player.rush.destroyedBedCount}\``)
                    message.channel.send(embed)
                    break;
                    case "hikabrain":
                        var embed = new Discord.MessageEmbed()
                        .setTitle("HikaBrain - YouTube Bot")
                        .setDescription(`Points: \`${player.hikaBrain.points}\`
                        Games \`${player.hikaBrain.gameCount}\`
                        Victories: \`${player.hikaBrain.victoryCount}\`
                        defeats: \`${player.hikaBrain.defeatCount}\`
                        Duration: \`${player.hikaBrain.gameTime}\`
                        Kills: \`${player.hikaBrain.killCount}\`
                        Deaths: \`${player.hikaBrain.deathCount}\``)
                        message.channel.send(embed)
                        break;
                        case "octogone":
                            var embed = new Discord.MessageEmbed()
                            .setTitle("Octogone - YouTube Bot")
                            .setDescription(`Points: \`${player.octogone.points}\`
                            Games \`${player.octogone.gameCount}\`
                            Victories: \`${player.octogone.victoryCount}\`
                            defeats: \`${player.octogone.defeatCount}\`
                            Duration: \`${player.octogone.gameTime}\`
                            Kills: \`${player.octogone.killCount}\`
                            Deaths: \`${player.octogone.deathCount}\`
                            Damages: \`${player.octogone.damageCount}\``)
                            message.channel.send(embed)
                            break;
                            case "blitz":
                                var embed = new Discord.MessageEmbed()
                                .setTitle("Blitz - YouTube Bot")
                                .setDescription(`Points: \`${player.blitz.points}\`
                                Games \`${player.blitz.gameCount}\`
                                Victories: \`${player.blitz.victoryCount}\`
                                defeats: \`${player.blitz.defeatCount}\`
                                Duration: \`${player.blitz.gameTime}\`
                                Kills: \`${player.blitz.killCount}\`
                                Deaths: \`${player.blitz.deathCount}\`
                                Nexus Damages: \`${player.blitz.nexusDamageCount}\``)
                                message.channel.send(embed)
                                break;
                                case "shootcraft":
                                    var embed = new Discord.MessageEmbed()
                                    .setTitle("ShootCraft - YouTube Bot")
                                    .setDescription(`Points: \`${player.shootCraft.points}\`
                                    Games \`${player.shootCraft.gameCount}\`
                                    Top 1: \`${player.shootCraft.top1Count}\`
                                    defeats: \`${player.shootCraft.defeatCount}\`
                                    Duration: \`${player.shootCraft.gameTime}\`
                                    Kills: \`${player.shootCraft.killCount}\`
                                    Deaths: \`${player.shootCraft.deathCount}\``)
                                    message.channel.send(embed)
                                    break;
                                    case "infecte":
                                        var embed = new Discord.MessageEmbed()
                                        .setTitle("Infecté - YouTube Bot")
                                        .setDescription(`Points: \`${player.infecte.points}\`
                                        Games \`${player.infecte.gameCount}\`
                                        Victories: \`${player.infecte.victoryCount}\`
                                        defeats: \`${player.infecte.defeatCount}\`
                                        Duration: \`${player.infecte.gameTime}\`
                                        Kills: \`${player.infecte.killCount}\`
                                        Deaths: \`${player.infecte.deathCount}\``)
                                        message.channel.send(embed)
                                        break;
                                        case "survival":
                                            var embed = new Discord.MessageEmbed()
                                            .setTitle("Survival - YouTube Bot")
                                            .setDescription(`Points: \`${player.survival.points}\`
                                            Games \`${player.survival.gameCount}\`
                                            Top 1: \`${player.survival.top1Count}\`
                                            defeats: \`${player.survival.defeatCount}\`
                                            Duration: \`${player.survival.gameTime}\`
                                            Kills: \`${player.survival.killCount}\`
                                            Deaths: \`${player.survival.deathCount}\``)
                                            message.channel.send(embed)
                                            break;
                                            case "pvpsmash":
                                                var embed = new Discord.MessageEmbed()
                                                .setTitle("PvPSmash - YouTube Bot")
                                                .setDescription(`Points: \`${player.PvPSmash.points}\`
                                                Games \`${player.PvPSmash.gameCount}\`
                                                Top 1: \`${player.PvPSmash.top1Count}\`
                                                defeats: \`${player.PvPSmash.defeatCount}\`
                                                Duration: \`${player.PvPSmash.gameTime}\`
                                                Kills: \`${player.PvPSmash.killCount}\`
                                                Deaths: \`${player.PvPSmash.deathCount}\`
                                                Damages: \`${player.PvPSmash.damageCount}\``)
                                                message.channel.send(embed)
                                                break;
                                                case "landrush":
                                                    var embed = new Discord.MessageEmbed()
                                                    .setTitle("LandRush - YouTube Bot")
                                                    .setDescription(`Points: \`${player.landRush.points}\`
                                                    Games \`${player.landRush.gameCount}\`
                                                    Victories: \`${player.landRush.victoryCount}\`
                                                    defeats: \`${player.landRush.defeatCount}\`
                                                    Duration: \`${player.landRush.gameTime}\`
                                                    Kills: \`${player.landRush.killCount}\`
                                                    Deaths: \`${player.landRush.deathCount}\`
                                                    Destroyed beds: \`${player.landRush.destroyedBedCount}\``)
                                                    message.channel.send(embed)
                                                    break;
            
                default:
                    message.channel.send("❌ | Error: this game don't exist !")
                    break;
            }
        }).catch(err => message.channel.send(`:x: | Error: this player don't exist !`) && console.log(err));
        //  showing specifig game stats of a player of funcraft
        } else {
        // showing specific game stats on funcraft
        funcraft.fetchPlayerCounts().then((counts) => {
            funcraft.fetchLeaderboard().then((leaderboard) => {
                let game = (args[0]).toLowerCase()

                switch (game) {
                    case "freecube":
                        var embed = new Discord.MessageEmbed()
                        .setTitle("FreeCube - YouTube Bot")
                        .addField("🏔 | FreeCube", `\`${counts.rush}\``)
                        .addField("🧮 | LeaderBoard", `disabled`)
                        message.channel.send(embed)
                        break;
                    case "rush":
                        var embed = new Discord.MessageEmbed()
                        .setTitle("Rush - YouTube Bot")
                        .addField("⚔️ | Rush", `\`${counts.freecube}\``)
                        .addField("🧮 | LeaderBoard", `#1 - ${leaderboard.rush.username} [avatar](${leaderboard.rush.avatar})`)
                        message.channel.send(embed)
                        break;
                        case "hikabrain":
                            var embed = new Discord.MessageEmbed()
                            .setTitle("HikaBrain - YouTube Bot")
                            .addField("<:fc_sandstone:690894179550756925> | HikaBrain", `\`${counts.hikabrain}\``)
                            .addField("🧮 | LeaderBoard", `#1 - ${leaderboard.hikabrain.username} [avatar](${leaderboard.hikabrain.avatar})`)
                            message.channel.send(embed)
                            break;
                            case "skywars":
                                var embed = new Discord.MessageEmbed()
                                .setTitle("Skywars - YouTube Bot")
                                .addField("🎴 | SkyWars", `\`${counts.skywars}\``)
                                .addField("🧮 | LeaderBoard", `#1 - ${leaderboard.skywars.username} [avatar](${leaderboard.skywars.avatar})`)

                                message.channel.send(embed)
                                break;

                                        case "infecte":
                                            var embed = new Discord.MessageEmbed()
                                            .setTitle("Infecté - YouTube Bot")
                                            .addField("🧟‍♂️ | Infected", `\`${counts.infecte}\``)
                                            .addField("🧮 | LeaderBoard", `#1 - ${leaderboard.infected.username} [avatar](${leaderboard.infected.avatar})`)

                                            message.channel.send(embed)
                                            break;
                                            case "other":
                                                var embed = new Discord.MessageEmbed()
                                                .setTitle("Other - YouTube Bot")
                                                .addField("❓ | other/lobby", `\`${counts.others}\``)
                                                .addField("🧮 | LeaderBoard", `disabled`)

                                                message.channel.send(embed)
                                                break;

                
                    default:
                        message.channel.send("❌ | Error: this game don't exist or the game isn't supported !")
                        break;

/*
.addField("<a:fc_freecube:690893394293162044> | FreeCube", `\`${counts.freecube}\``)
.addField("⚔️ | Rush", `\`${counts.rush}\``)
.addField("<:fc_sandstone:690894179550756925> | HikaBrain", `\`${counts.hikabrain}\``)
.addField("🎴 | SkyWars", `\`${counts.skywars}\``)
.addField("🧟‍♂️ | Infected", `\`${counts.infecte}\``)
.addField("❓ | other/lobby", `\`${counts.others}\``)
*/


                }

                /*
                {
                    rush: {
                        username: 'Awekooo',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/Awekooo/s/949f03f1d349208300be546a58d488c8a65f477a'
                    },
                    hikabrain: {
                        username: 'XeRRoX_',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/XeRRoX_/s/d87127aa9c55ddf7c8bf2b6bedaedfc4673b7f3e'
                    },
                    skywars: {
                        username: 'Aymerouz',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/Aymerouz/s/1e8b7d3db8b69ba247c800e0ea2ac14b33b50e94'
                    },
                    mma: {
                        username: 'TSEW',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/TSEW/s/b06f8bba3cf0a60356c714adae5faaa9aab20d92'
                    },
                    shootcraft: {
                        username: 'Welard_Manitou',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/Welard_Manitou/s/470103adb29913f8058aeca7684c76b15a385e8b'
                    },
                    infected: {
                        username: 'sweeetener',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/sweeetener/s/703a006a040646ead78368a903296181fe49e620'
                    },
                    survival: {
                        username: '100dewinrateenhg',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/100dewinrateenhg/s/d18bd2cf8a4dd9d6baf8fcc33c35880cf3c8439e'
                    },
                    blitz: {
                        username: 'CaVaEtreToutNoir',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/CaVaEtreToutNoir/s/44f8470780a5b22f11c0771ae9263940e256cb24'
                    },
                    pvpsmash: {
                        username: 'atakee',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/atakee/s/8ebf1b61e2534a7fef7de6e3e397bde765ede1ce'
                    },
                    landrush: {
                        username: 'OvD3_Nightmare',
                        avatar: 'https://d31zb6ev5hmn3f.cloudfront.net/_u/avatar/head/OvD3_Nightmare/s/91559b230da165ca54e870136e15da324c20a983'
                    }
                }
                */
            });
            /*
            {
                totalOnline: 2636,
                recordPlayerOnline: 18124,
                registeredPlayers: 1618964,
                premiumUsers: 702277,
                nonPremiumUsers: 916687,
                freecube: 478,
                rush: 428,
                hikabrain: 405,
                skywars: 304,
                infecte: 35,
                others: 986
            }
            */
        });

        }
    } else {

    }

}

    module.exports.help = {
        name: "funcraft",
        group: "Fun",
        botperms: [],
        usrperm: [],
        owneronly: false,
        usage: "funcraft <game/all> <player>",
        aliases: ["fc"],
        description: "Get informations about your player in the french minecraft server [Funcraft](https://funcraft.net)."
        }