const Client = require("./Base/YouTubeBot");
const {Intents} = require("discord.js");
const CustomIntents = new Intents();
CustomIntents.add(Intents.FLAGS.GUILDS);
CustomIntents.add(Intents.FLAGS.GUILD_MESSAGES);
CustomIntents.add(Intents.FLAGS.GUILD_MEMBERS);
CustomIntents.add(Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
CustomIntents.add(Intents.FLAGS.DIRECT_MESSAGES);
CustomIntents.add(Intents.FLAGS.DIRECT_MESSAGE_REACTIONS);
const client = new Client({ intents: CustomIntents });

client.login(client.config.TOKEN);

if(client.config.ENV == "PRODUCTION") {
process.on("uncaughtException", error => {
    client.logger.log(`An uncaught exception occurred: ${error.message}`, 'error')
}).on("unhandledRejection", reason => {
    client.logger.log(`An unhandled rejection occurred: ${reason.message}`, 'warn')
})
}