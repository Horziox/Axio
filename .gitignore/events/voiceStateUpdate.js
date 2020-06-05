const Discord = require("discord.js");
module.exports = (bot, oldState, newState) => {

  const hook = new Discord.WebhookClient('690172809376301121', process.env.whVocal);
  
  if((oldState.channelID == null || oldState.channelID == undefined) && newState.channelID != null) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Connexion Vocale")
      .setAuthor(oldState.member.user.tag, oldState.member.user.displayAvatarURL({dynamic: true}))
      .addField("Salon", newState.channel.name, true)
      .addField("Membre", "<@"+oldState.member.id+">\n`"+oldState.member.id+"`", true)
      .setColor("#25e64b")
      .setTimestamp()
      hook.send(embed)
  } else if((newState.channelID == null || newState.channelID == undefined) && oldState.channelID != null) {
  
    bot.guilds.cache.get("520221628563456000").fetchAuditLogs({limit: 1, type: 'MEMBER_DISCONNECT'})
      .then(audit => {
        var log = audit.entries.first() 
        sendLogs(log) 
     })
     function sendLogs(log) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Déconnexion Vocale")
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({dynamic: true}))
        .addField("Salon quitté", oldState.channel.name, true)
        .addField("Membre", "<@"+oldState.member.id+">\n`"+oldState.member.id+"`", true)
        .setColor("#d1310d")
        .setTimestamp()
        //if(newState.member.id != log.executor.id) embed.addField("Déconecté(e) par", `${log.executor}\n\`${log.executor.id}\``)
        hook.send(embed)
     }
  } else if(oldState.channelID == newState.channelID) return
  else {
  
     bot.guilds.cache.get("520221628563456000").fetchAuditLogs({limit: 1, type: 'MEMBER_DISCONNECT'})
     .then(audit => {
        var log = audit.entries.first() 
        sendLogs(log) 
     })
     function sendLogs(log) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Changement Salon Vocale")
        .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL({dynamic: true}))
        .setDescription("`"+oldState.channel.name+"` -> `"+newState.channel.name+"`")
        .addField("Membre", "<@"+oldState.member.id+">\n`"+oldState.member.id+"`", true)
        .setColor("#0d9dd1")
        .setTimestamp()
        //if(oldState.member.id != log.executor.id) embed.addField("Déplacé(e) par", `${log.executor}\n\`${log.executor.id}\``)
        hook.send(embed)
      }
   }
}
