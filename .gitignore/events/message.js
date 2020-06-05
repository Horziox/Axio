module.exports = (bot, message) => {
    var prefix = "!"

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName);

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(":x: Je ne peux pas effectuer cette commande en privé !");
    }

    if (command.isDisable) {
        return message.reply("Cette commande à été désactivée...\nPatience, elle reviendra bientôt !:tada:");
    }

    try {
        command.execute(message, args, bot, prefix);
    } catch (error) {
        message.reply(' oups... une erreur est survenue !:thinking:');
        console.log(error);
    }
}