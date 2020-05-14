const Discord = require("discord.js");

module.exports = {
    name: "verif",
    description: "Valide l\'entrée dans le serveur d'un membre.",
    usage: "mention/id Prénom Nom",
    guildOnly: true,
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n\'as pas les permissions pour pouvoir valider un membre !");
        let member = message.guild.member(message.mentions.users.first()||args[0])
        if(!member) return message.reply("Merci de mentionner la personne à valider !");
        let name = message.content.split(" ").slice(2).join(' ');
        if(!name) return message.reply("Tu as oublier de donner le Prénom et Nom !");

        member.roles.add('534802802514460672');
        member.setNickname(name);

        message.channel.send("**"+name+"** a bien été validé(e) ! :tada:");
    }
};
