const Discord = require("discord.js");
module.exports = (bot) => {
  console.log("Ready")
  const hook = new Discord.WebhookClient('690172280914837571', process.env.whDebug);
  let embed = new Discord.MessageEmbed()
  .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
  .setTitle("Redémarrage effectué")
  .setColor("#00fc58")
  .setTimestamp()
  hook.send(embed)
}
