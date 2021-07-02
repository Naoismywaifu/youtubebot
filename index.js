const Client = require("./Base/YouTubeBot");
const client = new Client();

client.login(client.config.TOKEN);

if(client.config.ENV == "PRODUCTION") {
process.on("uncaughtException", error => {
    client.logger.log(`An uncaught exception occurred: ${error.message}`, 'error')
}).on("unhandledRejection", reason => {
    client.logger.log(`An unhandled rejection occurred: ${reason.message}`, 'warn')
})
}