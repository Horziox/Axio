const Discord = require("discord.js");

module.exports = {
    name: "participant",
    execute(message, args, bot, prefix) {
        if(message.channel.id != '520229045997273104') return message.delete()
        var string = new String(args)
        let name = string.toString().toLowerCase()
        let id;
        if(!name) return
        else if(name == "animations") id = "696638362223902740";
        else return
        let user = bot.guilds.cache.get("520221628563456000").members.cache.get(message.author.id)
        let info = user.roles.cache.has(id)
        let role = bot.guilds.cache.get("520221628563456000").roles.cache.get(id)
        if(!info) {
            user.roles.add(role.id)
            message.reply(`a rejoint le groupe **${role.name}**.`)
        } else {
            user.roles.remove(role.id)
            message.reply(`a quitté le groupe **${role.name}**.`)
        }
    }
}
