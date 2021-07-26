const { MessageEmbed } = require('discord.js');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');

module.exports =
{
    name: 'Vote',
    aliases: ['voto', 'votar', 'topgg'],
    description: 'Retorna o link de voto para o pampobot no top.gg',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        const embed = new MessageEmbed()
        .setTitle('Clique aqui para votar no pampobot! Obrigado!')
        .setURL('https://top.gg/bot/830117848034181211/vote')
        .setColor('BLUE');

        if (!message) 
        {
            logSlash(interaction);

            return embed;
        }
        else
        {
            return message.channel.send(embed);
        }
    },
};