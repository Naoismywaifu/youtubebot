
module.exports = {
        name: 'reboot-shard',
        description: 'reboot a specific shard instead of make a complete reboot',
        cooldown: 20,
        guildOnly: false,
        ownerOnly: true,
        premiumOnly: false,
        DJOnly: false,
        args: true,
        enabled: true,
        category: "Owner",
        usage: '<shard id>',
        aliases: ["rebootshard", "shardreboot", "shard-reboot"],
        async execute(client, message, args) {

            if(isNaN(args[0]) || args[0] > client.shard.count || args[0] <= 0) return message.channel.send(message.language.get("REBOOT_SHARD_INVALID_NB"))
    
    
    message.channel.send(message.language.get("REBOOT_SHARD_REBOOTING")).then((m) => {
    client.shard.broadcastEval(`
    if(this.shard.ids.includes(${args[0]-1})){
        this.shard.send('reboot');
    }
`).then(() => {
    m.edit(message.language.get("REBOOT_SHARD_SUCCESS", args[0]))
})

    })

        },

    }
