const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Récupère l\'invitation du serveur.",
    execute(message, args, bot, prefix) {
        message.reply("https://discord.gg/ZNfGH7w");
    }
}
