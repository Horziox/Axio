const Discord = require("discord.js");
module.exports = (bot, message) => {
    //if (!message.guild) return
    if(message.channel.id == "689931230568775683") return
    const hook = new Discord.WebhookClient('690173157600002067', process.env.whMessage);
    bot.guilds.cache.get("551394507007197194").fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
    .then(audit => {
        var log = audit.entries.first() 
        sendLogs(log) 
    })
    async function sendLogs(log) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Message supprimé")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
        .addField("Salon", "<#"+message.channel.id+">", true)
        .addField("Auteur", "<@"+message.author.id+">\n`"+message.author.id+"`", true)
        if(message.author.id === log.target.id) embed.addField("Modérateur", `${log.executor}\n\`${log.executor.id}\``)
        embed.setColor("#d1310d")
        .setTimestamp()
        hook.send(embed)
    }
}
