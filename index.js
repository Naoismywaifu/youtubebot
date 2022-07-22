const Client = require("./Base/YouTubeBot");
const {Intents} = require("discord.js");
const YtBotIntents = new Intents();
YtBotIntents.add(Intents.FLAGS.GUILDS);
YtBotIntents.add(Intents.FLAGS.GUILD_MESSAGES);
YtBotIntents.add(Intents.FLAGS.GUILD_MEMBERS);
YtBotIntents.add(Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
YtBotIntents.add(Intents.FLAGS.DIRECT_MESSAGES);
YtBotIntents.add(Intents.FLAGS.DIRECT_MESSAGE_REACTIONS);
YtBotIntents.add(Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({ intents: YtBotIntents });

client.login(client.config.TOKEN);

if(client.config.ENV == "PRODUCTION") {
process.on("uncaughtException", error => {
    client.logger.log(`An uncaught exception occurred: ${error.message}`, 'error')
}).on("unhandledRejection", reason => {
    client.logger.log(`An unhandled rejection occurred: ${reason.message}`, 'warn')
})
}