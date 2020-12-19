const Player = require("../Base/Player")
const { WebhookClient } = require("discord.js")

class GuildMemberUpdate {

    constructor(client) {
        this.client = client;
    }

    run(oldMember, newMember) {

        if (oldMember.guild.id === this.client.config.SUPPORTGUILDID && newMember.guild.id === this.client.config.SUPPORTGUILDID) {

            const addedRoles = []
            newMember.roles.cache.forEach(role => {
                if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role.id);
            });

            if (addedRoles.includes(this.client.config.PREMIUM.WAITINGPREMIUM)) {
                this.client.db.users.add(`${newMember.id}.premiums`, 1)
                const hook = new WebhookClient(this.client.config.PREMIUM.WEBHOOKS.ID, this.client.config.PREMIUM.WEBHOOKS.TOKEN)
                hook.send(`${newMember.user.username} just got +1 premium server, congratulations !`)
                newMember.roles.remove(this.client.config.PREMIUM.WAITINGPREMIUM, "just putting it with the real premium role")
                newMember.roles.add(this.client.config.PREMIUM.PREMIUM, "added the real premium role")
            }

        }

    }
}

module.exports = GuildMemberUpdate;