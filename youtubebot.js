const { premium } = require("./premium");
const Discord = require("discord.js");
const Collection = require('discord.js')
const client = new Discord.Client({
  disableEveryone: true
});
const fs = require("fs");
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

client.player = player;

client.joker = joker

const { GiveawaysManager } = require("discord-giveaways");
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

/* old message handler */
 
/*
client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
  }
}); */


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

          /*
client.on("message", async message => {
   if (message.author.bot) return; 
   if (message.channel.type === "dm") return message.channel.send("🛑 | Oops: commands are executable only on a server");
 
   let prefix = config.prefix
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0].toLowerCase();
   let args = messageArray.slice(1);
   let cmdfinal = messageArray[0].toLowerCase().replace(prefix,'');
  /*
if(client.commands[cmdfinal].help.botperms){
  client.commands[cmdfinal].help.botperms.forEach((p) => {
    if(client.user.hasPermission(p)){
      let commandfile = (client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length))))
      if(commandfile) commandfile.run(client, message, args);
    } else {
      message.channel.send("🛑 | Oops: please add to me this permission for work correctly: `" + p + "`")
    }
  })
}



  let commandfile = (client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length))))
  if(commandfile) await commandfile.run(client, message, args);


}) */

client.login(config.token);
