const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');
const { MessageEmbed } = require('discord.js');

module.exports = 
{
    name: 'profile',
    aliases: ['pfp'],
    slash: 'both',
    expectedArgs: '[perfil]',
    description: 'Vou retornar a imagem íntegra de perfil de um usuário ou do seu!',
    callback: async ({ message, args, interaction, client }) => {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        let perfil;
        if (!args[0]) {
            if (message) {
                perfil = message.author;
            }
            else {
                perfil = await client.users.fetch(interaction.member.user.id);
            }
        }
        else {
            perfil = message.mentions.users.first();
        }

        const embed = new MessageEmbed();
        try {
            embed.setImage(perfil.displayAvatarURL({ dynamic: true, size: 4096 }));
            embed.setColor('BLUE');
            embed.setAuthor(`Eis a imagem de perfil de ${perfil.username}`);
        } catch (e) {
            embed.setColor('RED');
            embed.setDescription('Não foi possível adquirir a imagem de do perfil solicitado.');
            console.error(e);
        }
        
        if (message) return message.channel.send(embed);
    
        logSlash(interaction);
        return embed;
    },
};