const Discord = require("discord.js");

module.exports = {
    name: "identité",
    description: "Permets de ping le sas-présentation.",
    execute(message, args, bot, prefix) {
        message.delete();
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
        if(message.channel.id !="533251614279073794") return
        let embed = new Discord.messageEmbed()
        .setTitle("Vérification")
        .setDescription("Pensez à vous identifier en envoyant une photo de votre carte de self ou de votre carnet afin d\'accéder au reste des salons !:wink:")
        .setColor("#FFFFF")
        message.channel.send("@here", embed);
    }
}
