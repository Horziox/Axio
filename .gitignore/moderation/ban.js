const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "Banni définitement du serveur.",
    usage: "@mention/ID raison",
    guildOnly: true,
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("Tu n\'as pas la force néssaire pour soulever le Ban Hammer...:person_shrugging:");

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!member) return message.reply("Merci de mentionner la personne à bannir !");
        if (!member.bannable) return message.reply("Je ne peux pas bannir cette personne :thinking:");

        let reason = message.content.split(" ").slice(2).join(' ');
        if(!reason) reason = "*Aucune*";

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
        .setTitle("Bannissement")
        .setDescription("**__Raison du bannissement :__**\n"+reason)
        .addField("Modérateur", message.author.tag, true)
        .addField("Membre banni", member.user.tag, true)
        .addField("Dans le", message.channel, true)
        .setColor("#000000")
        .setTimestamp()
        bot.channels.get("643887642882211840").send({embed});

        member.send("Tu est banni du serveur **"+message.guild+"** pour la raison suivante :\n"+reason).catch();

        member.ban(reason).catch();

        message.channel.send(`**${member.user.tag}** a bien été banni(e) !`);
    }
};