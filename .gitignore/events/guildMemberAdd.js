const Discord = require("discord.js");
module.exports = (bot, member) => {
  const hook = new Discord.WebhookClient('690176414342709326', process.env.whJoinLeft);
  var msg = [
    `Oh !\nUn(e) ${member.user} vient d\'apparaitre sur le serveur !:scream:`,
    `Hey salut !:partying_face:\nJ'espère que tu as pensé(e) à la pizza ${member.user} ?:sweat_smile:`,
    `Hé ! Écoutez ! ${member.user} nous a rejoint !`,
    `Où est ${member.user} ? Dans le serveur !`,
    `**Swoooosh** !!! ${member.user} vient juste d'atterrir.`,
    `${member.user} vient de rejoindre le serveur ! u.u`,
   ];
   let bvn = msg[Math.floor(Math.random() * msg.length)];
   let embed = new Discord.MessageEmbed()
   .setTitle(member.user.tag)
   .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
   .setDescription(bvn)
   .addField("Règlement", "Un petit tour dans le <#520225211149320196> stp ?")
   .addField("Vérification", "Pensez à aller dans le <#533251614279073794> agent ! ^^", true)
   .setColor("7ED321")
   .setTimestamp()
   hook.send("<@"+member.user.id+">",embed)
}
