const Discord = require("discord.js");
module.exports = {
    name: "info",
    description: "Récupère des infos sur le bot, le serveur ou de votre compte.",
    usage: "<ordre> (ordre = bot ou serveur)",
    execute(message, args, bot, prefix) {

        let info = message.content.split(" ").slice(1).join()
        if(info==="bot") {
            let embed = new Discord.MessageEmbed()
            .setAuthor(bot.user.username+" Informations")
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("Salut !\nJe suis "+bot.user.username+", un bot multi-fonctions dévellopé pour vous rendre service !")
            .addField("Versions Logiciel/Librairies", "NodeJS : ``"+process.version+"``\nDiscord.js : ``"+Discord.version+"``\nrequest : ``2.88.0``\nfs : ``0.0.1``\nutil : ``0.12.1``", true)
            .addField("Utilisation Ressources", "OS : "+process.platform+"\nUtilisation RAM : ``"+`${(process.memoryUsage().heapUsed/1000000).toFixed(2)}`+" Mo``", true)
            .addField("Ping", `Bot : ${Date.now() - message.createdTimestamp}`+" ms", true)
            .setColor("#FFFFF")
            .setTimestamp()
            .setFooter(`Commande faite par ${message.author.username}`, message.author.displayAvatarURL())
            message.channel.send({embed});
        } else if (info==="serveur") {
            let info = bot.guilds.cache.get("520221628563456000")
            let event = new Date(message.guild.createdAt);

            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setAuthor(message.guild)
            .setTitle("Informations sur le serveur :")
            .addField("Propriétaire",message.guild.owner, true)
            .addField("Identifiant", "`"+info.id+"`", true)
            .addField("Membres",message.guild.memberCount)
            .addField("Roles",info.roles.cache.size, true)
            .addField("Salons",info.channels.cache.size, true)
            .addField("Date de création", event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear())
            .setTimestamp()
            .setColor("#FFFFF")
            .setFooter(`Commande faite par ${message.author.username}`, message.author.displayAvatarURL())
            message.channel.send({embed});
        } else {
            let info = bot.guilds.cache.get("520221628563456000").members.cache.get(message.author.id)
            let event = new Date(message.author.createdAt);
            let join = new Date(info.joinedTimestamp)
            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Informations sur votre compte :")
            .addField("Pseudo :",message.author.username, true)
            .addField("Tag :",message.author.tag, true)
            .addField("Surnom :", info.nickname ? info.nickname : '*Aucun surnom*')
            .addField("Identifiant :", "`"+info.id+"`", true)
            .addField("Création du compte :", event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear())
            .addField("A rejoint le :", join.getDate()+"/"+join.getMonth()+"/"+join.getFullYear())
            .setTimestamp()
            .setColor("#FFFFF")
            message.channel.send({embed});
        }
    }
}
