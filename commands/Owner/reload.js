const Command = require("../../Base/Command");

class Reload extends Command {

    constructor(client) {
        super(client, {
            name: "reload",
            aliases: ["rl"],
        });
    }

    async run(message, args) {


        if(!args || args.length < 1) return message.channel.send(this.t("commands:Owner.reload.noCommandName"));
        const commandName = args[0];
        let command = this.client.getCommand(commandName);
        if(!command) {
            return message.channel.send(this.t("commands:Owner.reload.noExistCmd"));
        }
        delete require.cache[require.resolve(`../${command.help.category}/${command.name}.js`)];
        this.client.commands.delete(command.name);
        const props = require(`../${command.help.category}/${command.name}.js`);
        this.client.commands.set(command.name, new props(this.client, {
                category: command.help.category
        }));
        return message.channel.send(this.t("commands:Owner.reload.reloaded", {
            cmd: command.name
        }));

    }

}

module.exports = Reload;


