let db = require("quick.db")

module.exports = {
    isGuildPremium(GuildID) {
        return Boolean(db.guildconf.has(`${GuildID}.premium`));
    },
    getPrefix(GuildID) {
        // TODO: Support prefix
        return require("../config").PREFIX;
    }
}