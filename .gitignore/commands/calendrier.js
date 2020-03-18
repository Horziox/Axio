const Discord = require("discord.js");

module.exports = {
    name: "calendrier",
    description: "Calendrier cours",
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
        let embed = new Discord.RichEmbed()
        .setTitle("Calendriers Cours")
        .setDescription("Voici la liste des différents calendriers afin de savoir vos cours sur ce serveur !")
        .addField("Secondes", "(Calendrier Secondes)[https://docs.google.com/document/d/13fy6Y6gzqOL-439_1EF_kNZys_f5MZjhUk2IO_NqvNA/edit?usp=sharing]", true)
        .addField("Premières", "(Calendrier Premières)[https://docs.google.com/document/d/1Z_enSrol7VK5Fe4CW2Ax47WhKUBdM8hv51ip27bY_8I/edit?usp=sharing]", true)
        .addField("Terminales", "(Calendrier Terminales)[https://docs.google.com/document/d/1VDxxp3IaxIwaCJXLxWFxY3G9yxFEyy_yWCK74bT-MO4/edit?usp=sharing]", true)
        .setColor("#FFFFF")
        message.channel.send(embed);
    }
}
