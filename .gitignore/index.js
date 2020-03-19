const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

bot.commands = new Discord.Collection()
bot.fun = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const funFiles = fs.readdirSync('./fun').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
for (const file of funFiles) {
	const command = require(`./fun/${file}`);
	bot.fun.set(command.name, command);
}

const logs = require('./logs.js');
logs.logs(bot)

var prefix = "!";

bot.login("NjQ2MDQ5Mjk1NTQzNDM1MjY2.XdLgkQ.UQaDdI99pN41TjLVdAJ5WE0cztw");

bot.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase();
    
  const command = bot.commands.get(commandName) || bot.fun.get(commandName)

  if(!command) return

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply(":x: Je ne peux pas effectué cette commande en privé !");
  }

  if (command.isDisable) {
    return message.reply("Cette commande à été désactivée...\nPatience, elle reviendra bientôt !:tada:");
  }
    
  try {
    command.execute(message, args, bot, prefix);
  } 
  catch (error) {
	  message.reply(' oups... une erreur est survenue !:thinking:');
	  const hook = new Discord.WebhookClient('690172280914837571', process.env.whDebug);
	  let embed = new Discord.MessageEmbed()
	  .setAuthor(message.author.tag, message.author.displayAvatarURL())
	  .setTitle("Erreur")
	  .setDescription("```"+error.message+"```")
	  .addField("Auteur", message.author.tag)
	  .addField("Commande", message.content, true)
	  .addField("Dans le", message.channel, true)
	  .setColor("#3d424a")
	  .setTimestamp()
	  hook.send(embed)
  }
    
});

setInterval(function() {
  let game = ["TE surveiller ;)",prefix+"help","surveiller le Staff...", "Axio ou Vérité !? :3", "se marrer en solitaire...",]
  let status = game[Math.floor(Math.random() * game.length)];
  bot.user.setActivity(status , {type : "PLAYING"});
}, 5000)
