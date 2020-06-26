const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
        name: 'update-i18n',
        description: 'Update all translations of the bot.',
        cooldown: 15,
        guildOnly: false,
        ownerOnly: true,
        args: false,
        enabled: true,
        category: "Owner",
        usage: '',
        aliases: ["updatei18n", "i18n-update"],
        execute(client, message, args) {
            if(message.author.id !== "355995885085392896") return;

            fs.readdir(`${__dirname}/../languages/`, (err, files) => {
                    console.log(files)
                    files.forEach((file) => {
                        delete require.cache[require.resolve(`./${file}`)];
                
            })
        })
                
            

        


            }


        }