const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

module.exports = {
    name: "warn",
    description: "Averti un membre.",
    usage: "@mention/ID raison",
    guildOnly: true,
    isDisable : true,
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("tu n\'as pas les permissions nécessaires pour avertir quelqu\'un.");
        let wuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!wuser) return message.channel.send("Oups "+message.author+"...\nTu as oublier de mentionné la personne à avertir !:wink:");
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("pourquoi vouloir avertir un autre modérateur ?:thinking:");
        let reason = message.content.split(" ").slice(2).join(' ');
        if(!reason) reason = "*Aucune*";
        
        if(!warns[wuser.id]) warns[wuser.id] = {
            warns: 0
        }

        warns[wuser.id].warns++;

        if(warns[wuser.id].warns == 5) {
            wuser.send("Tu possède 5 avertissements.\nTu as donc été banni(e) définitivement du serveur...");
            wuser.ban().catch();
        }

        fs.writeFileSync('./warns.json', JSON.stringify(warns), (err) => {  
            if (err) console.log(err);
        });

        let embed = new Discord.RichEmbed()
        .setAuthor("Avertissement")
        .setDescription("**__Raison de l\'avertissement :__**\n"+reason)
        .addField("Modérateur", message.author.tag, true)
        .addField("Membre averti", wuser.user.tag, true)
        .addField("Dans le", message.channel, true)
        .addField("Nombre d\'avertissement(s)", warns[wuser.id].warns, true)
        .setColor("#FC6400")
        .setTimestamp()
        bot.channels.get("643887642882211840").send({embed});

        message.channel.send("**"+wuser.user.tag+"** a bien été averti(e) !")

        wuser.send("Tu as reçu un avertissement depuis le serveur **"+message.guild+"** pour la raison suivante :\n"+reason).catch();
    }
}
