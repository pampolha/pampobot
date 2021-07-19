const { MessageEmbed } = require('discord.js');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');

module.exports =
{
    name: 'convite',
    aliases: ['invite'],
    description: 'Retorna o link de convite do pampobot',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        const embed = new MessageEmbed()
        .setTitle('Clique aqui para adicionar o pampobot a outros servidores!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=830117848034181211&permissions=0&scope=bot%20applications.commands')
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