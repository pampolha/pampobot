const { MessageEmbed } = require('discord.js');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');

module.exports =
{
    name: 'github',
    aliases: ['git'],
    description: 'Retorna o link do repositório aberto do pampobot no github',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        const embed = new MessageEmbed()
        .setTitle('Clique aqui para ir ao meu repositório do GitHub!')
        .setURL('https://github.com/pampolha/pampobot')
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