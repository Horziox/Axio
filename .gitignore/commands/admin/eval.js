const Discord = require("discord.js");
const { inspect } = require("util");
module.exports = {
    name: "eval",
    execute(message, args, client, prefix) {
        if(message.guild.id != "713737474643329024" && !message.author.roles.has("713738108889464853")) return message.delete()
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, {depth: 0}))
        if(toEval) {
            let hrStart = process.hrtime()
            let hrDiff = process.hrtime(hrStart)
            return message.channel.send(`\`${toEval}\`\n*Exécuté en ${hrDiff[0]>0 ? `${hrDiff[0]}sec` :''}${hrDiff[1]/1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, {maxlengh: 1900})
        } else message.reply("oups, tu as oublié l'eval...");
    }
}