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

var prefix = "!";

bot.login(process.env.DiscordToken);

bot.on('ready', function() {
  console.log("Ready")
  bot.user.setActivity("je redémarre !" , {type : "WATCHING"})
  let embed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username}`,`${bot.user.displayAvatarURL}`)
    .setTitle("Redémarrage effectué")
    .setColor("#00fc58")
    .setTimestamp()
    bot.channels.get("644167825451384832").send({embed})
});

bot.on('guildMemberAdd', member=> {
  var msg = [
	  `Oh !\nUn(e) ${member.user} vient d\'apparaitre sur le serveur !:scream:`,
	  `Hey salut !:partying_face:\nJ'espère que tu as pensé(e) à la pizza ${member.user} ?:sweat_smile:`,
	  `Hé ! Écoutez ! ${member.user} nous a rejoint !`,
	  `Où est ${member.user} ? Dans le serveur !`,
	  `**Swoooosh** !!! ${member.user} vient juste d'atterrir.`,
	  `${member.user} vient de rejoindre le serveur ! u.u`,
  ];
	let bvn = msg[Math.floor(Math.random() * msg.length)];
	let embed = new Discord.RichEmbed()
	.setTitle(member.user.tag)
	.setThumbnail(`${member.user.displayAvatarURL}`)
	.setDescription(bvn)
	.addField("Règlement", "Un petit tour dans le <#520225211149320196> stp ?")
	.addField("Vérification", "Pensez à aller dans le <#533251614279073794> agent ! ^^", true)
	.setColor("7ED321")
	.setTimestamp()
	bot.channels.get("644202587377238023").send({embed});
})

bot.on('guildMemberRemove', member => {
	var msg = [
		`**${member.user.tag}** est allé(e) cueillir des fleurs.`,
		`NON !\n**${member.user.tag}** a appuyé(e) sur le bouton Quitter le serveur...`,
		`**${member.user.tag}** a quitté(e) le serveur.\nMinute ! C'était qui en fait !?:thinking:`,
		`1,2,... 98,99,... C'est bien ce qu'il me semblait !\n**${member.user.tag}** a quitté(e) le serveur !:sob:`,
	];
	let gb = msg[Math.floor(Math.random() * msg.length)];
	let embed = new Discord.RichEmbed()
	.setColor('D0021B')
	.setTitle(member.user.tag)
	.setThumbnail(`${member.user.displayAvatarURL}`)
	.setDescription(gb)
	.setTimestamp()
	bot.channels.get("644202587377238023").send({embed});
})


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
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
    .setTitle("Erreur")
    .setDescription("```"+error.message+"```")
    .addField("Auteur", message.author.tag)
    .addField("Commande", message, true)
    .addField("Dans le", message.channel, true)
    .setColor("#3d424a")
    .setTimestamp()
    bot.channels.get("644167825451384832").send({embed})
  }
    
});

setInterval(function() {
  let game = ["TE surveiller ;)",prefix+"help","surveiller le Staff...", "Axio ou Vérité !? :3", "se marrer en solitaire...",]
  let status = game[Math.floor(Math.random() * game.length)];
  bot.user.setActivity(status , {type : "PLAYING"});
}, 5000)
