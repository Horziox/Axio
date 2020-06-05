const Discord = require("discord.js");
module.exports = (bot, oldMessage, newMessage) => {
  if(oldMessage.content == newMessage.content) return
  if(oldMessage.channel.id == "689931230568775683") return
  if(oldMessage.author.bot) return
  const hook = new Discord.WebhookClient('690173157600002067', process.env.whMessage);
  let embed = new Discord.MessageEmbed()
  .setTitle("Message mis à jour")
  .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({dynamic: true}))
  .setDescription("**Ancien :**\n"+oldMessage.content+"\n**Nouveau :**\n"+newMessage.content)
  .addField("Salon", "<#"+oldMessage.channel.id+">", true)
  .addField("Auteur", "<@"+oldMessage.author.id+">\n`"+oldMessage.author.id+"`", true)
  .addField("Message", "[Aller au message]("+newMessage.url+")")
  .setColor("#0d9dd1")
  .setTimestamp()
  hook.send(embed)
}
