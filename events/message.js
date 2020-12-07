const i18next = require("i18next");
const Command = require("../Base/Command");


class Message {

    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;

        const prefix = this.client.config.PREFIX;

        if (message.content.indexOf(prefix) !== 0) return;

		let t
		const setFixedT = function (translate) {
			t = translate
		}

		let language = this.client.db.guildconf.has(`${message.guild.id}.language`) ? this.client.db.guildconf.get(`${message.guild.id}.language`) : 'en-US';
		if(["french", "english"].includes(language)){
		    switch (language) {
                case "french":
                    language = "fr-FR"
                    break;
                case "english":
                    language = "en-US"
                    break;
            }
        }
		setFixedT(i18next.getFixedT(language))

        

        const args = message.content.slice(prefix.length).trim().split(" ");
        const cmd = args.shift().toLowerCase();

        const command = this.client.getCommand(cmd);
        if (!command) return;


        command.setT(t);
        message.t = t;
        message.guild.t = t;

        if(command.help.category === "Owner" && !this.client.config.OWNERS.includes(message.author.id))
            return message.channel.send(t("commands:unallowed"))

        try {
            await command.run(message, args);
        } catch(e) {
            console.error(e);
            return message.channel.send(`Something went wrong while executing command "**${cmd}**"!`);
        }
    }

}

module.exports = Message;