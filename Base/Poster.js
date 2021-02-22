const blapi = require("blapi");

class Poster {
    constructor(client) {
        this.client = client;
        this.client.logger.log(`Starting posting stats`, "debug")
        blapi.setBotblock(true)
        this._Post()
        setInterval(this._Post(), 30*60*1000)
    }

     async _Post() {
        let [guildCounts, totalGuildCount] = await this.getGuildCount();
		blapi.manualPost(totalGuildCount, this.client.user.id, this.client.config.BOTLISTS, this.client.shard.ids[0], guildCounts.length, guildCounts);
        return true;
    }

    async getPoster(){
        return blapi;
    }

    async getGuildCount() {
		const guildCounts = await this.client.shard.fetchClientValues("guilds.cache.size"); // ['1006', '966']
		const totalGuildCount = guildCounts.reduce((total, current) => total + current, 0); // 1972
		return [guildCounts, totalGuildCount];
	}
}
module.exports = Poster;