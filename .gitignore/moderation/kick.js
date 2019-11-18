const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Exclue la personne souhaitée.",
    usage: "@mention/ID raison",
    guildOnly: true,
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("Tu n\'as pas les permissions nécessaires pour exclure quelqu\'un.");

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!member) return message.reply("Mentionne la personne que tu souhaite exclure.")
        if (!member.kickable) return message.reply(", je ne peux pas exclure cette personne :thinking:");

        let reason = message.content.split(" ").slice(2).join(' ');
        if(!reason) reason = "*Aucune*";

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
        .setTitle("Exclusion")
        .setDescription("**__Raison de l\'exclusion :__**\n"+reason)
        .addField("Modérateur", message.author.tag, true)
        .addField("Membre exclu", member.user.tag, true)
        .addField("Dans le", message.channel, true)
        .setColor("#ff0000")
        .setTimestamp()
        bot.channels.get("643887642882211840").send({embed});

        member.kick(reason).catch();

        member.send("Tu est exclu du serveur **"+message.guild+"** pour la raison suivante :\n"+reason).catch();

        message.channel.send(`**${member.user.tag}** a bien été exclu(e) !`);
    }
};