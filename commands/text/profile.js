const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');
const { MessageEmbed } = require('discord.js');

module.exports = 
{
    name: 'profile',
    aliases: ['pfp'],
    slash: 'both',
    expectedArgs: '[mencao_ou_id]',
    description: 'Vou retornar a imagem íntegra de perfil de um usuário ou do seu!',
    callback: async ({ message, args, interaction, client }) => {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        let perfil;
        const embed = new MessageEmbed();

        if (!args[0]) {
            if (message) {
                console.log(message.author.id);
                perfil = await client.users.fetch(message.author.id);
            }
            else {
                perfil = await client.users.fetch(interaction.member.user.id);
            }
        }
        else {
            try {
                perfil = await client.users.fetch(args[0].replace(/[<!@>]/gim, ''));  
            } catch (e) {
               // anything that is not a mention will be ignored
            }
        }

        try {
            embed.setImage(perfil.displayAvatarURL({ dynamic: true, size: 4096 }));
            embed.setColor('BLUE');
            embed.setAuthor(`Eis a imagem de perfil de ${perfil.username}:`);
        } catch (e) {
            embed.setColor('RED');
            embed.setDescription('Não foi possível adquirir a imagem de do perfil solicitado.' + '\n' + 'Faça uma menção do usuário que deseja ter a foto.');
            console.error(e);
        }
        
        if (message) return message.channel.send(embed);
    
        logSlash(interaction);
        return embed;
    },
};