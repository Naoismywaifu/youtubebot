const { premium } = require("./premium");
const Discord = require("discord.js");
const Collection = require('discord.js')
const client = new Discord.Client({
  disableEveryone: true
});
const Keyv = require('keyv');
var radiodb = require('quick.db')

const fs = require("fs");
const { GiveawaysManager } = require("discord-giveaways");
const config = require("./config.json");
const opusscript = require("node-opus")
const DBL = require("dblapi.js")
const { Client } = require("blague.xyz");
const joker = new Client(config.blaguexyz, {
    defaultLang: "en"
});
const { Player } = require("discord-player");
const player = new Player(client, config.music.YT_API_KEY, {
  leaveOnEnd: false,
  leaveOnStop: true,
  leaveOnEmpty: false
});


const sqlite3 = require('sqlite3').verbose();




const dbl = new DBL(config.topgg, client);

const db = new Keyv('sqlite://assets/db.sqlite');



const manager = new GiveawaysManager(client, {
    storage: "./assets/giveaways.json",
    updateCountdownEvery: config.giveaways.updatetimer,
    default: {
        botsCanWin: config.giveaways.allowbots,
        embedColor: config.giveaways.embedcolor,
        reaction: config.giveaways.reaction,
        embedColorEnd: '#00FF00'
          }
})




dbl.on('posted', () => {
  console.log('Server count posted!');
 // client.channels.cache.get(686988653494403125).send(`just updated the servercount of the shard #${client.shard.ids}`)
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
 //client.channels.cache.get(686988653494403125).send(`Oops error on the shard #${client.shard.ids}\nError: ${e}`)
})


client.dbl = dbl;

client.db = db;

client.radiodb = radiodb;


client.player = player;

client.joker = joker

client.giveawaysManager = manager;

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

if(!client.shard) return console.error("❌ | Please start the bot with the file sharder.js not index.js !")

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();



this.client = client


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("❌ | There isn't any command to load!");
    return;
  }
  console.log(`📦 | Loading ${jsfile.length} commands !`);

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`✅ | ${f} command has loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
      })
  });

});



client.login(config.token);
