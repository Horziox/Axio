const Discord = require("discord.js");
module.exports = {
    name: "help",
    description: "Besoin d\'aide ? Cette commande est faite pour toi !",
    execute(message, args, bot, prefix) {

        let demande = message.content.split(" ").slice(1).join();
        if (!demande) {
            let embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setTitle("Liste de mes commandes")
            .addField("Informations", "`"+prefix+"help` Affiche ce message.\n`"+prefix+"ping` Permet de controler mon ping.\n`"+prefix+"warns` Regarde ton nombre de warns.\n`"+prefix+"invite` Récupère le lien du serveur !")
            .addField("Fun", "`"+prefix+"avatar` récupère ton avatar ou celui de la personne mentionnée/ID.\n`"+prefix+"info` Récupère des infos sur le serveur, toi, moi,...")
            .setColor("#FFFFF")
            .setTimestamp()
            .setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
            message.channel.send({embed});
        }
        else if (demande==="modo") {
            let embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setTitle("Commandes Modérateurs")
	    .addField("Valider un membre", "`"+prefix+"verif` Valide un membre à l\entrée du serveur.", true)
            .addField("Supprimer messages","`"+prefix+"sup` Supprime le nombre de msg demandés.", true)
            .addField("Exclure un membre","`"+prefix+"kick` Exclu la personne mentionnée/ID.", true)
            .addField("Bannir un membre","`"+prefix+"ban` Banni la personne mentionnée/ID.", true)
            .addField("Avertir un membre","`"+prefix+"warn` Donne un avertissement à la personne mentionnée/ID.", true)
            .setColor("#FFFFF")
            .setTimestamp()
            .setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
            message.channel.send({embed});
        } else {
            const data = [];
            const commandName = args[0].toLowerCase();
            const command = bot.commands.get(commandName) || bot.fun.get(commandName) || bot.moderation.get(commandName)

            if (!command) {
			    return message.reply("Ta commande est invalide ou n\'existe pas !:eyes:");
		    }

		    data.push(`**Nom :** ${command.name}`);

		    if (command.description) data.push(`**Description :** ${command.description}`);
		    if (command.usage) data.push(`**Utilisation :** ${prefix}${command.name} ${command.usage}`);

		    message.channel.send(data, { split: true });
        }

    }
    
}
