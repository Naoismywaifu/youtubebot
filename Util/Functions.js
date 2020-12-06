let db = require("quick.db")

module.exports = {
    isGuildPremium(GuildID) {
        return Boolean(db.guildconf.has(`${GuildID}.premium`));
    }
}