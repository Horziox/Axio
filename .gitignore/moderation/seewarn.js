const Discord = require("discord.js");
const fs = require("fs");
let warns = require("../warns.json")

module.exports = {
    name: "warns",
    description: "Permet de voir votre nombre d'avertissement ou celui de la personne mentionnée.",
    usage: "@mention/ID",
    guildOnly: true,
    execute(message, args, bot, prefix) {

        let wuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

        if(!wuser) {
            let warn;
            if(!warns[message.author.id]) {
                warn = 0
            } else {
                warn = warns[message.author.id].warns;
            }
            message.reply("vous possédez **"+warn+"** avertissement(s) !")
        } else {
            let warn;
            if(!warns[wuser.id]) {
                warn = 0
            } else {
                warn = warns[wuser.id].warns;
            }
            message.reply("**"+wuser.user.tag+"** possède **"+warn+"** avertissement(s) !")
        }
    }
}