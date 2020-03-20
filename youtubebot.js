const { premium } = require("./premium");
const Discord = require("discord.js");
const Collection = require('discord.js')
const client = new Discord.Client({
  disableEveryone: true
});
const fs = require("fs");
//const Keyv = require('keyv');
//const KeyvFile = require('keyv-file')
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

const dbl = new DBL(config.topgg, client);

//const db = new Keyv({
// store: new KeyvFile({
//    filename: `../assets/premium.json`, // the file path to store the data
//    expiredCheckDelay: 3600 * 1000, // ms, check and remove expired data in each ms
//    writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
//    encode: JSON.stringify, // serialize function
//    decode: JSON.parse // deserialize function
//  })
//})

//db.on('error', err => console.log('Connection Error', err));

const manager = new GiveawaysManager(client, {
    storage: "./assets/giveaways.json",
    updateCountdownEvery: config.giveaways.updatetimer,
    default: {
        botsCanWin: config.giveaways.allowbots,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: config.giveaways.embedcolor,
        reaction: config.giveaways.reaction
    }
})


/*
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
  var votemenbed = new Discord.MessageEmbed()
  .setDescription(`thanks to ${vote.user} for have voted for the bot ! you have automaticaly get your perks\n\n https://top.gg/bot/486948160124485642`)
  .setColor("ORANGE")
  .setFooter("Youtube Bot")
  .setTimestamp()
  client.channels.cache.get(659054396818063434).send(votemenbed)

})
*/

dbl.on('posted', () => {
  console.log('Server count posted!');
 // client.channels.cache.get(686988653494403125).send(`just updated the servercount of the shard #${client.shard.ids}`)
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
 //client.channels.cache.get(686988653494403125).send(`Oops error on the shard #${client.shard.ids}\nError: ${e}`)
})


client.dbl = dbl;

//client.db = db;

client.player = player;

client.joker = joker

client.giveawaysManager = manager;



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
