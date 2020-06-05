const Discord = require("discord.js");
module.exports = (bot, message) => {
    if (!message.guild) return
    if(message.channel.id == "689931230568775683") return
    const hook = new Discord.WebhookClient('690173157600002067', process.env.whMessage);
    var fetchLogs = message.guild.fetchAuditLogs({limit: 1, type: 'MESSAGE_DELETE'})
    var log = fetchLogs.entries.first() 
    let embed = new Discord.MessageEmbed()
    .setTitle("Message supprimé")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(message.content)
    .addField("Salon", "<#"+message.channel.id+">", true)
    .addField("Auteur", "<@"+message.author.id+">\n`"+message.author.id+"`", true)
    .setColor("#d1310d")
    .setTimestamp()
    if(log && message.author.id === log.target.id) embed.addField("Supprimé par", `${log.executor}\n\`${log.executor.id}\``)
    hook.send(embed)
}
