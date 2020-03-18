const Discord = require("discord.js");
module.exports = {
    name: "info",
    description: "Récupère des infos sur le bot, le serveur, votre compte ou celui de la personne mentionnée !",
    usage: "<ordre> (ordre = bot, serveur ou mention utilisateur)",
    execute(message, args, bot, prefix) {

        let info = message.content.split(" ").slice(1).join()
        if(info==="bot") {
            let embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username+" Informations")
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription("Salut !\nJe suis "+bot.user.username+", un bot multi-fonctions dévellopé pour vous rendre service !")
            .addField("Versions Logiciel/Librairies", "NodeJS : ``"+process.version+"``\nDiscord.js : ``"+Discord.version+"``\nrequest : ``2.88.0``\nfs : ``0.0.1``\nutil : ``0.12.1``", true)
            .addField("Utilisation Ressources", "OS : "+process.platform+"\nUtilisation RAM : ``"+`${(process.memoryUsage().heapUsed/1000000).toFixed(2)}`+" Mo``", true)
            .addField("Ping", "Bot : ``"+`${Date.now() - message.createdTimestamp}`+" ms``\nAPI : ``"+`${Math.round(bot.ping)}`+" ms``", true)
            .setColor("#FFFFF")
            .setTimestamp()
            .setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
            message.channel.send({embed});
        } else if (info==="serveur") {
            
            let event = new Date(message.guild.createdAt);

            let embed = new Discord.RichEmbed()
            .setThumbnail(message.guild.iconURL)
            .setAuthor(message.guild)
            .setTitle("Informations sur le serveur :")
            .addField("Propriétaire :",message.guild.owner, true)
            .addField("Nombres de membres :",message.guild.members.size, true)
            .addField("Nombres de roles :",message.guild.roles.size, true)
            .addField("Nombres de salons totaux :",message.guild.channels.size)
            .addField("Date de création :", event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear())
            .setTimestamp()
            .setColor("#FFFFF")
            .setFooter("Commande faite par "+`${message.author.username}`,`${message.author.displayAvatarURL}`)
            message.channel.send({embed});
        } else {

            if (!info) {
                info = message.author
            } else {
                info = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])).user
            }
            
            let event = new Date(info.createdAt);
            
            let embed = new Discord.RichEmbed()
            .setThumbnail(info.displayAvatarURL)
            .setTitle("Informations sur votre compte :")
            .addField("Pseudo :",info.username, true)
            .addField("Surnom :", info.nickname ? info.nickname : '*Aucun surnom*', true)
            .addField("Tag :",info.tag, true)
            .addField("Identifiant :", info.id, true)
            .addField("Joue à :", info.presence.game ? info.presence.game.name : '*Aucune activitée*')
            .addField("Création du compte :", event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear())
            .setTimestamp()
            .setColor("#FFFFF")
            message.channel.send({embed});
        }
    }
}
