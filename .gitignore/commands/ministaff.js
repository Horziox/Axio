const Discord = require("discord.js");

module.exports = {
    name: "ministaff",
    description: "Message recrutement fermé.",
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
        let embed = new Discord.RichEmbed()
        .setTitle("Recrutement Mini Staff")
        .setDescription("La période de recrutement des **Mini Staff** est actuellement fermée !\nN'hésites pas à surveiller le <#520226617558040586> afin d'être dans les premiers informés lorsque le recrutement sera à nouveau ouvert ! ^^")
        .setColor("#FFFFF")
        message.channel.send(embed);
    }
}
