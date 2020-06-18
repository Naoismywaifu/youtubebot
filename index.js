
const discord = require("discord.js");
const client = new discord.Client({ 
  disableEveryone: true, 
  disabledEvents: ["TYPING_START"]
 });
const fs = require("fs")
const { readdirSync } = require("fs");
const { join } = require("path");
const config = require("./config.json");
const db = require("quick.db")

db.premium = new db.table('premium')
db.radio = new db.table('radio')
db.notifier = new db.table('notifier')
db.guildconf = new db.table('guildconf')
db.stats = new db.table('stats')
db.premiumnotifier = new db.table("premiumnotifier")
db.users = new db.table("users")
db.codes = new db.table("codes")

client.commands = new discord.Collection();
client.cooldowns = new discord.Collection();
client.config = config
client.prefix = config.PREFIX;
client.queue = new Map();
client.db = db;

client.funct = require("./util/functions.js")


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

process.on("uncaughtException", err => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});


client.login(config.TOKEN);