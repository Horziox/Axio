const Discord = require("discord.js");
const fs = require("fs");
const utils = require("./utils.js");

const bot = new Discord.Client();
bot.login(process.env.DiscordToken);

bot.commands = new Discord.Collection();

// Enregistrement des évènements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    try {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
    } catch (e) {
        console.error(`Error when loading ${file} !`);
        console.error(e);
    }
}

// Enregistrement des commandes
let commandFolder = fs.readdirSync('./commands');
commandFolder.forEach(file => {
    if (file.endsWith('.js')) {
        utils.importFile(bot, `commands/${file}`);
    } else {
        utils.cycleDir(bot, `./commands/${file}`);
    }
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {

    } catch (e) {
        console.error(`Error when loading ${file} !`);
        console.error(e);
    }
}

setInterval(function() {
	let game = ["TE surveiller ;)",prefix+"help","surveiller le Staff...", "Axio ou Vérité !? :3", "se marrer en solitaire...",]
	let status = game[Math.floor(Math.random() * game.length)];
	bot.user.setActivity(status , {type : "PLAYING"});
}, 5000)
