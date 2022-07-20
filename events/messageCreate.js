const i18next = require("i18next");

class MessageCreate {

    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;

        let t;

        let language = 'en-US'

        if(message.guild) {
            language = this.client.db.guildconf.has(`${message.guild ? message.guild.id : null}.language`) ? this.client.db.guildconf.get(`${message.guild ? message.guild.id : null}.language`) : 'en-US';
        }

        if(["french", "english"].includes(language)){
            switch (language) {
                case "french":
                    language = "en-FR"
                    break;
                case "english":
                    language = "en-US"
                    break;
            }
        }

        setFixedT(i18next.getFixedT(language))


        function setFixedT(translate) {
            t = translate
        }

        if(message.content.match(new RegExp(`^<@!?${this.client.user.id}>( |)$`))){
            if(message.guild){
                return message.channel.send(t("commands:helloServer", {
                    username: message.author.username,
                    theprefix: this.client.functions.getPrefix(message.guild ? message.guild.id : null)
                }));
            } else {
                return message.channel.send(t("commands:helloDM", {
                    username: message.author.username
                }));
            }
        }


        let prefix = this.client.functions.getPrefix(message.guild ? message.guild.id : null);

        if (Array.isArray(prefix) ? !prefix.some((p) => message.content.indexOf(p) == 0) : message.content.indexOf(prefix) !== 0) return;

        if(Array.isArray(prefix)){
            prefix = prefix.filter((p) => message.content.indexOf(p) === 0)[0] 
        }

        message.prefix = prefix

        const args = message.content.slice(prefix.length).trim().split(" ");
        const cmd = args.shift().toLowerCase();

        const command = this.client.getCommand(cmd);
        if (!command) return;


        this.client.logger.logCMD(this.client, message, command.name, args)


        command.setT(t);
        message.t = t;
        if(message.guild) {
            message.guild.t = t;
        }

        if(command.help.guildOnly && !message.guild)
            return message.channel.send(t("commands:onlyGuild"))

        if (command.help.category === "Owner" && !this.client.config.OWNERS.includes(message.author.id))
            return message.channel.send(t("commands:unallowed"))

        if (command.help.category === "Config" && !this.client.functions.isStaff(message))
            return message.channel.send(t("commands:notStaff"))

        if(message.guild) {

            if (command.help.premiumOnly && !this.client.functions.isGuildPremium(message.guild.id))
                return message.channel.send(t("commands:premiumOnly"));


            if (command.help.StaffOnly && !this.client.functions.isStaff(message))
                return message.channel.send(t("commands:notStaff"))

            if (command.help.DJOnly && !this.client.functions.isDJ(message))
                return message.channel.send(t("commands:notDJ"))

            let neededPermissions = [];
            if(!command.help.botPerms.includes("EMBED_LINKS")){
                command.help.botPerms.push("EMBED_LINKS");
            }
            command.help.botPerms.forEach((perm) => {
                if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                    neededPermissions.push(perm);
                }
            });

            if(neededPermissions.length > 0){
                return message.channel.send(t("commands:MISSING_BOT_PERMS", {
                    list: neededPermissions.map((p) => `\`${p}\``).join(", ")
                }));
            }
            neededPermissions = [];
            command.help.userPerms.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermissions.push(perm);
                }
            });
            if(neededPermissions.length > 0){
                return message.channel.send(t("commands:MISSING_MEMBER_PERMS", {
                    list: neededPermissions.map((p) => `\`${p}\``).join(", ")
                }));
            }


            if(["Music", "Filters"].includes(command.help.category) && this.client.radioManager.queue.has(message.guild.id))
                return message.channel.send(t("commands:RadioPlaying"))


        }



        try {
            await command.run(message, args);
        } catch(e) {
            console.error(e);
            return message.channel.send(t("commands:commandError", {
                cmd:command.name,
                err:e.message
            }));
        }
    }

}

module.exports = MessageCreate;