const { Client: DiscordClient, Collection } = require("discord.js");
const fs = require("fs");
const db = require("quick.db")
const Sentry = require('@sentry/node');
const blapi = require("blapi");

class Client extends DiscordClient {

    constructor(...args) {
        super(...args);

        db.premium = new db.table('premium')
        .radio = new db.table('radio')
        .notifier = new db.table('notifier')
        .guildconf = new db.table('guildconf')
        .stats = new db.table('stats')
        .errors = new db.table('errors')
        .users = new db.table("users")
        .codes = new db.table("codes");

        this.commands = new Collection();
        this.aliases = new Collection();
        this.db = db;
        this.player = null;
        this.config = require("../config");
        this.logger = require("../Util/Logger")
        this.commandsDir = __dirname + "/../commands";
        this.eventsDir = __dirname + "/../events";
        
        if(this.config.ENV === "PRODUCTION") {
            Sentry.init({ dsn: this.config.SENTRY_DSN });
            blapi.handle(this, this.config.Botlists);
        }
    
    }

    registerCommands() {
        fs.readdir(this.commandsDir, (error, ctg) => {
            if (error) throw error;

            ctg.forEach(category => {
                fs.readdir(`${this.commandsDir}/${category}`, (error, commands) => {
                    if (error) throw error;

                    commands.filter(command => command.endsWith(".js")).forEach(cmd => {
                        const Prop = require(`${this.commandsDir}/${category}/${cmd}`);
                        const prop = new Prop(this);

                        prop.help.category = category;
                        prop.location = `${this.commandsDir}/${category}/${cmd}`;

                        this.logger.log(`Loaded command ${cmd.split(".")[0]} 👌`, 'cmd')
                      //  console.log(`Loaded command ${cmd}...`);
                        this.commands.set(prop.help.name, prop);
                        prop.help.aliases.forEach(alias => this.aliases.set(alias, prop.help.name));
                    });
                });
            });
        });
    }

    registerEvents() {
        fs.readdir(this.eventsDir, (error, events) => {
            if (error) throw error;

            events.filter(event => event.endsWith(".js")).forEach(event => {
                const prop = require(`${this.eventsDir}/${event}`);
                const ev = new prop(this);
                const eventName = event.split(".")[0];


                this.logger.log(`Loaded event ${eventName} 🌐`)
                this.on(eventName, (...args) => ev.run(...args));
                delete require.cache[require.resolve(`${this.eventsDir}/${event}`)];
            });
        });
    }

	loadLocales() {
		const Locales = require("../Util/LangManager")
		const locales = new Locales(this)
		locales.load()
	}

    getCommand(name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    login(token = null) {
        this.registerCommands();
        this.registerEvents();
        this.loadLocales()

        return super.login(token);
    }

}

module.exports = Client;