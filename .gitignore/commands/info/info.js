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
            .setDescription("Salut !\nJe suis "+bot.user.username+", un bot multi-fonctions développé pour vous rendre service !")
            .addField("Versions Logiciel/Librairies", `NodeJS : \`\`${process.version}\`\`\nDiscord.js : \`\`${Discord.version}\`\`\nfs : \`\`0.0.1\`\`\npath : \`\`0.12.7\`\``, true)
            .addField("Utilisation Ressources", "OS : "+process.platform+"\nUtilisation RAM : ``"+`${(process.memoryUsage().heapUsed/1000000).toFixed(2)}`+" Mo``", true)
            .addField("Ping", `Bot : ${Date.now() - message.createdTimestamp}`+" ms", true)
            .addField("Statistiques du bot", `Nombres de serveurs : ${bot.guilds.cache.size}\nNombres de salons ${bot.channels.cache.size}\nNombre d'utilisateurs : ${bot.users.cache.size}`)
            .setColor("#FFFFF")
            .setTimestamp()
            .setFooter(`Commande faite par ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send({embed});
        } else if (info==="serveur") {
            let info = bot.guilds.cache.get(message.guild.id)
            let event = new Date(message.guild.createdAt);
            let month = event.getMonth() + 1

            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setAuthor(message.guild)
            .setTitle("Informations sur le serveur :")
            .addField("Propriétaire",message.guild.owner, true)
            .addField("Identifiant", "`"+info.id+"`", true)
            .addField("Membres",message.guild.memberCount, true)
            .addField("Roles",info.roles.cache.size, true)
            .addField("Salons",info.channels.cache.size, true)
            .addField("Date de création", event.getDate()+"/"+month+"/"+event.getFullYear())
            .setTimestamp()
            .setColor("#FFFFF")
            .setFooter(`Commande faite par ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send({embed});
        } else {
            let member = message.guild.member(message.mentions.users.first()||args[0])

            if(!member) {
                let info = bot.users.cache.get(message.author.id)
                let infoServeur = bot.guilds.cache.get(message.guild.id).members.cache.get(message.author.id)
                let event = new Date(message.author.createdAt);
                let join = new Date(infoServeur.joinedTimestamp)
                let month = join.getMonth() + 1
                let monthCrea = event.getMonth() + 1
                let embed = new Discord.MessageEmbed()
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setTitle("Informations sur votre compte :")
                .addField("Pseudo :",message.author.username, true)
                .addField("Tag :",message.author.tag, true)
                if(info.nickname != null) embed.addField("Surnom :", info.nickname, true)
                embed.addField("Identifiant :", "`"+info.id+"`", true)
                .addField("Création du compte :", event.getDate()+"/"+monthCrea+"/"+event.getFullYear())
                .addField("A rejoint le :", join.getDate()+"/"+month+"/"+join.getFullYear())
                .setTimestamp()
                .setColor("#FFFFF")
                message.channel.send({embed}); 
            } else {
                let info = bot.users.cache.get(member.user.id)
                let infoServeur = bot.guilds.cache.get(message.guild.id).members.cache.get(member.user.id)
                let event = new Date(member.user.createdAt);
                let join = new Date(infoServeur.joinedTimestamp)
                let month = join.getMonth() + 1
                let monthCrea = event.getMonth() + 1
                let embed = new Discord.MessageEmbed()
                .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                .setTitle("Informations sur le compte de "+member.user.username+" :")
                .addField("Pseudo :",member.user.username, true)
                .addField("Tag :",member.user.tag, true)
                if(info.nickname != null) embed.addField("Surnom :", info.nickname, true)
                embed.addField("Identifiant :", "`"+info.id+"`", true)
                .addField("Création du compte :", event.getDate()+"/"+monthCrea+"/"+event.getFullYear())
                .addField("A rejoint le :", join.getDate()+"/"+month+"/"+join.getFullYear())
                .setTimestamp()
                .setColor("#FFFFF")
                .setFooter(`Commande faite par ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send({embed});
            }
            
        }
    }
}
