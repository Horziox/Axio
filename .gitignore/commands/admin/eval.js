const Discord = require("discord.js");
const { inspect } = require("util");
const fs = require("fs");
module.exports = {
    name: "eval",
    execute(message, args, bot, prefix) {
        if(message.author.id != '340212760870649866') return message.delete()
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, {depth: 0}))
        if(toEval) {
            let hrStart = process.hrtime()
            let hrDiff = process.hrtime(hrStart)
            if(evaluated.length >= 2000) {
                fs.writeFileSync("./eval.txt", evaluated)
                var attach = new Discord.MessageAttachment("./eval.txt")
                return message.channel.send(`\`${toEval}\`\n*Exécuté en ${hrDiff[0]>0 ? `${hrDiff[0]}sec` :''}${hrDiff[1]/1000000}ms.*`, attach)
            } else return message.channel.send(`\`\`\`javascript\n${toEval}\n\`\`\`\n*Exécuté en ${hrDiff[0]>0 ? `${hrDiff[0]}sec` :''}${hrDiff[1]/1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, {maxlengh: 1900})
        } else message.reply("oups, tu as oublié l'eval...");
    }
}
