const Discord = require("discord.js");

module.exports = {
    name: "animation",
    description: "Message recrutement fermé.",
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")|| !message.guild.member(message.author).roles.cache.has("670553022384046101")) return
        let embed = new Discord.MessageEmbed()
        .setTitle("Participation aux Animations")
        .setDescription("Pour avoir accès aux salons vocaux et être alerté lors des prochaines animations, vous devez vous donner le rôle <@696638362223902740> !\nPour ce faire, rendez-vous dans le salon <#520229045997273104> et tapez `!participant animations`.\nVous ne voulez plus ce rôle ? Vous n'avez qu\'à refaire cette commande !^^")
        .setColor("#FFFFF")
        message.channel.send(embed);
    }
}
