class Command {

    constructor(client, ops) {
        this.client = client;
        this._patch(ops);
    }

	setT(t) {
		this.t = t
	}

	getT() {
		return this.t
	}

    _patch(ops) {
        this.help = {
            name: ops.name || null,
            aliases: ops.aliases || [],
            DJOnly: ops.DJOnly||false,
            enabled: ops.enabled||true,
            guildOnly: ops.guildOnly||false,
            StaffOnly: ops.StaffOnly||false,
            botPerms: ops.botPerms||[],
            userPerms: ops.userPerms||[],
            premiumOnly: ops.premiumOnly||false,
            category: ops.category||"Core"
        };

        this.name = this.help.name;
    }

}

module.exports = Command;