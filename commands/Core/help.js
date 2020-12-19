const Command = require("../../Base/Command");
const Discord = require("discord.js")

class Help extends Command {

    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["aide", "h"],
        });
    }

    async run(message, args) {

		if(args[0]){

            const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));

			if(!cmd){
				return message.channel.send(this.t("commands:Core.help.specific.commandDoNotExist"));
			}

	
			// Creates the help embed
            const groupEmbed = new Discord.MessageEmbed()
                .addField(
                    this.t("commands:Core.help.specific.name"),
                    cmd.help.name||this.t("commands:Core.help.specific.NoName")
                )
				.addField(
					this.t("commands:Core.help.specific.description"),
					this.t(`commands:${cmd.help.category}.${cmd.help.name}.description`)||this.t("commands:Core.help.specific.NoDesc")
                )
				.addField(
					this.t("commands:Core.help.specific.category"),
					cmd.help.category||this.t("commands:Core.help.specific.NoCategory")
				)
				.addField(
					this.t("commands:Core.help.specific.aliases"),
					cmd.help.aliases.length > 0
						? cmd.help.aliases.map(a => "`" + a + "`").join(", ")
						: this.t("commands:Core.help.specific.NoAliases")
				)
				.setColor("DARK_RED")
	try {
		return message.channel.send(groupEmbed);
	} catch (e) {
		return message.channel.send(this.t(".help.failedSendEmbed", {
			err: e
		}))
			}
		}

		const categories = [];
		const commands = this.client.commands;

		commands.forEach((command) => {
			if(!categories.includes(command.help.category)){
				if(command.help.category === "Owner" && !this.client.config.OWNERS.includes(message.author.id)){
					return;
				}
				categories.push(command.help.category);
			}
		});


		const embed = new Discord.MessageEmbed()
			.setDescription(`${this.t("commands:Core.help.global.Title")}\n${this.t("commands:Core.help.global.Desc", {
                cmdslength: commands.size||0,
                categorieslength: categories.length||0
            })}`)
			.setColor("RED")
			.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
		categories.sort().forEach((cat) => {
			const tCommands = commands.filter((cmd) => cmd.help.category === cat);
            embed.addField(`${this.client.config.EMOJIS.HELPEMOJIS[cat] ? `${this.client.config.EMOJIS.HELPEMOJIS[cat]} ❱` : ""} **${cat}** (${tCommands.size})`, `\`\`\`diff
- ${tCommands.map((cmd) => cmd.help.name).join(", ")}
\`\`\``)
            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true, format: "gif", size:4096})).setTimestamp()
		});
        
        return message.channel.send(embed);


    }

}

module.exports = Help;