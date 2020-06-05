const Discord = require("discord.js");
module.exports = (bot, error) => {
  const hook = new Discord.WebhookClient('690172280914837571', process.env.whDebug);
  let embed = new Discord.MessageEmbed()
  .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}))
  .setTitle("Error")
  .setDescription(`\`\`\`js\n${error}\n\`\`\``)
  .setColor("#ff1900")
  .setTimestamp()
  hook.send(embed)
}
