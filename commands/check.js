const Discord = require("discord.js")
const config = require("../config.json")
const functions = require("../util/functions")

module.exports = {
        name: 'check',
        description: 'make tests !',
        cooldown: 5,
        guildOnly: true,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Core",
        usage: '',
        aliases: [],
        execute(client, message, args) {


            message.channel.send(functions.isStaff(message))


            
            }


        }