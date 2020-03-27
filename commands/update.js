const Discord = require("discord.js");
const fs = require("fs")
const { exec } = require('child_process');


module.exports.run = async (client, message, args) => {

if(message.author.id !== "355995885085392896") return message.channel.send("🛑 | this command is only executable by the owner of the bot")

try {
    message.channel.send("<a:loading:653279329022640128> | Downloading updates...")
    const result = await exec('git pull origin master');
    await message.channel.send(`✅| Updated successfully! Downloading new packages `);
    message.channel.send("<a:loading:653279329022640128> | Downloading news npm packages")
    const result2 = await exec('npm install');
    await message.channel.send(`✅| Installed new npm packages successfully ! Rebooting...`);
    client.shard.broadcastEval("process.exit(0);")
} catch (e) {
    msg.channel.send(`❌ | Error while updating: \`\`\`\n${e}\n\`\`\``);
}
}

module.exports.help = {
    name: "update",
    group: "Owner",
    botperms: [],
    usrperm: [],
    owneronly: true,
    usage: "update",
    aliases: ["gh-update", "github-update"],
    description: "SelfUpdater™, update the bot to the last github version (private repository)"
    }