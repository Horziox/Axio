const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Récupère ton avatar ou celui de la personne mentionnée !",
    usage: "@mention ou identifiant",
    isDisable: true,
    execute(message, args, bot, prefix) {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!member) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Voici ta photo de profil ${message.author.username} !`)
            .setImage(message.author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setTimestamp()
            message.channel.send(embed);
        } else {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Voici la photo de profil de ${member.user.username} !`)
            .setImage(member.user.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setFooter(`Commande faîte par ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            message.channel.send(embed);
        };
    }
};
