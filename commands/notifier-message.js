const { MessageEmbed } = require("discord.js")


module.exports = {
    name: 'notifier-message',
    description: 'Edit the message sent when a youtuber post a new video',
    cooldown: 15,
    args: false,
    guildOnly: true,
    staffOnly: true,
    enabled: true,
    category: "Notifier",
    usage: '',
    aliases: ["msgnotifier", "notify-message"],
    async execute(client, message, args) {


        const filter = (m) => m.author.id === message.author.id,
        opt = { max: 1, time: 90000, errors: [ "time" ] };
        
        let embed = new MessageEmbed()
.addField(message.language.get("NOTIFIER_MESSAGE_INFO"), `\`\`\`${message.language.get("NOTIFIER_MESSAGE_PROVIDE")}\`\`\``, true)
.addField(message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS"), `\`\`\`asciidoc
{youtuber.name} ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_YTBER_NAME")}

{video.url}     ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_YTBER_URL")}
{video.title}   ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_YTBER_TITLE")}
{video.date}    ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_YTBER_UPLOADDATE")}
{emojis.youtube}::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_EMOJIS_YOUTUBE")}
{guild.name}    ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_GUILD_NAME")}
{guild.id}      ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_GUILD_ID")}
{guild.owner}   ::  ${message.language.get("NOTIFIER_MESSAGE_PLACEHOLDERS_GUILD_OWNER")}
\`\`\``, true)
.addField(message.language.get("NOTIFIER_MESSAGE_EXAPLE"), `\`\`\`${message.language.get("NOTIFIER_MESSAGE_EXAPLE_EXAPLE")}\`\`\``, false)

        const msg = await message.channel.send(embed)

        let collected = await message.channel.awaitMessages(filter, opt).catch(() => {});
        if(!collected || !collected.first()){
            msg.delete()
            return message.channel.send(message.language.get("NOTIFIER_MESSAGE_CANCELED"))
        }
             const confMessage = collected.first().content;
        if(confMessage === "cancel"){
            msg.delete() 
            return msg.channel.send(message.language.get("NOTIFIER_MESSAGE_CANCELED_REQUESTED"));
        }
        client.db.notifier.set(`${message.guild.id}.message`, confMessage)

        msg.channel.send(message.language.get("NOTIFIER_MESSAGE_SUCCESS"))

    
    
    }

  
  };
  