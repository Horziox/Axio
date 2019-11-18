const Discord = require("discord.js");

module.exports = {
    name: "sup",
    description: "Supprime le nombre de messages demandé.",
    usage: "nombre message à supprimer",
    guildOnly: true,
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n\'as pas les permissions pour pouvoir supprimer des messages !");
        let msgsup = message.content.split(" ").slice(1).join();
        message.channel.bulkDelete(msgsup).catch(error => message.reply(", je ne peux pas supprimer les messages car :\n" +`${error}`));
        message.channel.send(":ok_hand: **"+msgsup+"** messages ont bien été supprimés !")
        setTimeout(function(){
            message.channel.bulkDelete(1).catch();
        }, 3000)
    }
};