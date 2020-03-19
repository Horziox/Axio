const Discord = require("discord.js")

module.exports = {
    logs: function(bot) {
        //Redémarrage
        bot.on('ready', function() {
            console.log("Ready")
            const hook = new Discord.WebhookClient('690172280914837571', process.env.whDebug);
            let embed = new Discord.messageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setTitle("Redémarrage effectué")
            .setColor("#00fc58")
            .setTimestamp()
            hook.send(embed)
        });
        //Message supprimé
        bot.on('messageDelete', message => {
            const hook = new Discord.WebhookClient('690173157600002067', process.env.whMessage);
            let embed = new Discord.messageEmbed()
            .setTitle("Message supprimé")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(message.content)
            .addField("Salon", "<#"+message.channel.id+">", true)
            .addField("Auteur", "<@"+message.author.id+">\n`"+message.author.id+"`", true)
            .setColor("#d1310d")
            .setTimestamp()
            hook.send(embed)
        });
        //Message Update
        bot.on('messageUpdate', (oldMessage, newMessage) => {
            const hook = new Discord.WebhookClient('690173157600002067', process.env.whMessage);
            let embed = new Discord.messageEmbed()
            .setTitle("Message mis à jour")
            .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
            .setDescription("**Ancien :**\n"+oldMessage.content+"\n**Nouveau :**\n"+newMessage.content)
            .addField("Salon", "<#"+oldMessage.channel.id+">", true)
            .addField("Auteur", "<@"+oldMessage.author.id+">\n`"+oldMessage.author.id+"`", true)
            .addField("Message", "[Aller au message]("+newMessage.url+")")
            .setColor("#0d9dd1")
            .setTimestamp()
            hook.send(embed)
        });
        //Connexion/Déconnexion/Changement Vocal
        bot.on('voiceStateUpdate', (oldState, newState) => {
            
            const hook = new Discord.WebhookClient('690172809376301121', process.env.whVocal);
        
            if((oldState.channelID == null || oldState.channelID == undefined) && newState.channelID != null) {
                let embed = new Discord.messageEmbed()
                .setTitle("Connexion Vocale")
                .setAuthor(oldState.member.user.tag, oldState.member.user.displayAvatarURL())
                .addField("Salon", newState.channel.name, true)
                .addField("Membre", "<@"+oldState.user.id+">\n`"+oldState.user.id+"`", true)
                .setColor("#25e64b")
                .setTimestamp()
                hook.send(embed)
            } else if((newState.channelID == null || newState.channelID == undefined) && oldState.channelID != null) {
                let embed = new Discord.messageEmbed()
                .setTitle("Déconnexion Vocale")
                .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL())
                .addField("Salon quitté", oldState.channel.name, true)
                .addField("Membre", "<@"+oldState.user.id+">\n`"+oldState.user.id+"`", true)
                .setColor("#d1310d")
                .setTimestamp()
                hook.send(embed)
            } else {
                let embed = new Discord.messageEmbed()
                .setTitle("Changement Salon Vocale")
                .setAuthor(newState.member.user.tag, newState.member.user.displayAvatarURL())
                .setDescription("`"+oldState.channel.name+"` -> `"+newState.channel.name+"`")
                .addField("Membre", "<@"+oldState.user.id+">\n`"+oldState.user.id+"`", true)
                .setColor("#0d9dd1")
                .setTimestamp()
                hook.send(embed)
            }
        });
        //Nouveau Utilisateur
        bot.on('guildMemberAdd', member => {
          const hook = new Discord.WebhookClient('690176414342709326', process.env.whJoinLeft);
          var msg = [
            `Oh !\nUn(e) ${member.user} vient d\'apparaitre sur le serveur !:scream:`,
            `Hey salut !:partying_face:\nJ'espère que tu as pensé(e) à la pizza ${member.user} ?:sweat_smile:`,
            `Hé ! Écoutez ! ${member.user} nous a rejoint !`,
            `Où est ${member.user} ? Dans le serveur !`,
            `**Swoooosh** !!! ${member.user} vient juste d'atterrir.`,
            `${member.user} vient de rejoindre le serveur ! u.u`,
          ];
          let bvn = msg[Math.floor(Math.random() * msg.length)];
          let embed = new Discord.messageEmbed()
          .setTitle(member.user.tag)
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(bvn)
          .addField("Règlement", "Un petit tour dans le <#520225211149320196> stp ?")
          .addField("Vérification", "Pensez à aller dans le <#533251614279073794> agent ! ^^", true)
          .setColor("7ED321")
          .setTimestamp()
          hook.send("<@"+member.user.id+">",embed)
        });
        //Départ Utilisateur
        bot.on('guildMemberRemove', member => {
            const hook = new Discord.WebhookClient('690176414342709326', process.env.whJoinLeft);
            var msg = [
              `**${member.user.tag}** est allé(e) cueillir des fleurs.`,
              `NON !\n**${member.user.tag}** a appuyé(e) sur le bouton Quitter le serveur...`,
              `**${member.user.tag}** a quitté(e) le serveur.\nMinute ! C'était qui en fait !?:thinking:`,
              `1,2,... 98,99,... C'est bien ce qu'il me semblait !\n**${member.user.tag}** a quitté(e) le serveur !:sob:`,
            ];
            let gb = msg[Math.floor(Math.random() * msg.length)];
            let embed = new Discord.messageEmbed()
            .setColor('D0021B')
            .setTitle(member.user.tag)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(gb)
            .setTimestamp()
            hook.send(embed)
        });
    }
}
