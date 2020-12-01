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
				return message.channel.send("Oops this command don't exist !");
			}

	
			// Creates the help embed
            const groupEmbed = new Discord.MessageEmbed()
                .addField(
                    "Name",
                    cmd.help.name||this.t("commands:General.help.specific.NoName")
                )
				.addField(
					"Description",
					this.t(`commands:${cmd.help.category}.${cmd.help.name}.description`)||this.t("commands:General.help.specific.NoDesc")
                )
				.addField(
					"Category",
					cmd.help.category||this.t("commands:General.help.specific.NoCategory")
				)
				.addField(
					"Aliases",
					cmd.help.aliases.length > 0
						? cmd.help.aliases.map(a => "`" + a + "`").join(", ")
						: this.t("commands:General.help.specific.NoAliases")
				)
				.setColor("BLUE")

			return message.channel.send(groupEmbed);
		}

		const categories = [];
		const commands = this.client.commands;

		commands.forEach((command) => {
			if(!categories.includes(command.help.category)){
				if(command.help.category === "Owner" && !this.client.config.owners.includes(message.author.id)){
					return;
				}
				categories.push(command.help.category);
			}
		});


		const embed = new Discord.MessageEmbed()
			.setDescription(`${this.t("commands:General.help.global.Title")}\n${this.t("commands:General.help.global.Desc", {
                cmdslength: commands.size||0,
                categorieslength: categories.length||0
            })}`)
			.setColor("RED")
			.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
		categories.sort().forEach((cat) => {
			const tCommands = commands.filter((cmd) => cmd.help.category === cat);
            embed.addField(cat+" - ("+tCommands.size+")", `\`\`\`diff
- ${tCommands.map((cmd) => cmd.help.name).join(", ")}
\`\`\``)
            .setFooter("YouTube Bot").setThumbnail()
		});
        
        return message.channel.send(embed);


    }

}

module.exports = Help;