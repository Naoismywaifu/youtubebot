const Discord = require('discord.js');

module.exports = {
        name: 'newcode',
        description: "Generate a new code.",
        cooldown: 15,
        guildOnly: false,
        ownerOnly: false,
        args: false,
        enabled: true,
        category: "Premium",
        usage: '',
        aliases: ["gencode"],
        execute(client, message, args) {

            function generate(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
             }

             if(message.channel.type !== "dm") return message.channel.send(message.language.get("NEWCODE_CANT_DM"))

             if(client.db.users.get(`${message.author.id}.premiums`) <= 0) return message.channel.send(message.language.get("GETPREMIUM_NOPREMIUM"))

             message.author.send(message.language.get("NEWCODE_GENERATING"))

             client.db.users.subtract(`${message.author.id}.premiums`, 1)

             let code = `${generate(5)}-${generate(5)}-${generate(5)}-${generate(5)}`

             message.author.send(message.language.get("NEWCODE_SUCCESS", code))

             client.db.codes.set(code, { "author":message.author.id, "date":Date.now() })

    }
}