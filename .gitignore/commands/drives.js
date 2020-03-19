const Discord = require("discord.js");

module.exports = {
    name: "drives",
    description: "Drives cours",
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
        let embed = new Discord.MessageEmbed()
        .setTitle("Drives Cours")
        .setDescription("Voici la liste des différents drives diponibles !")
        .addField("Informations", "[Infos Parents Eleves](https://drive.google.com/open?id=1eHMP0uFgkN-37IAooy4w_JEP9fl4rllA)\n[Courriers Divers](https://drive.google.com/open?id=1l8HV88ExYSb3DwPz6lhfMDuhQPyzkxdt)")
        .addField("Secondes", "[Secondes 3 et 4 Mars 2020](https://drive.google.com/open?id=1U2xdLxEVD6sog3nbPbelr-I8IbHMqW0b)")
        .addField("Premières", "[Premières Mars 2020](https://drive.google.com/open?id=1T-NF2Tr6Jd7rpwxmkLP5NMCvc-MvrcFY)")
        .addField("Terminales", "[Courriers Divers](https://drive.google.com/open?id=1rNj8uNBAhPDVeuaL10mzTlNSO1Uckfk6)\n[TS2 et TS3 Mars 2020](https://drive.google.com/open?id=1tFiaWxWvcbPyFC3h8z9VXnfZIbr2qJOo)")
        .setColor("#FFFFF")
        message.channel.send(embed);
    }
}
