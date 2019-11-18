const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Récupère mon ping.",
    execute(message, args, bot, prefix) {
        message.reply(" :ping_pong:"+`${Date.now() - message.createdTimestamp}`+ 'ms. Ping API : ' + `${Math.round(bot.ping)}`+ ' ms');
    }
}