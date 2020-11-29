class Command {

    constructor(client, ops = {}) {
        this.client = client;
        this._patch(ops);
    }

	setT(t) {
		this.t = t
	}

	getT() {
		return this.t
	}

    _patch(ops = {}) {
        this.help = {
            name: ops.name || null,
            description: ops.category|| "No description provided!",
            aliases: ops.aliases || [],
            category: "Others"
        };

        this.name = this.help.name;
    }

}

module.exports = Command;