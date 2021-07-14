const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distube/distubeClient');

module.exports =
{
    name: 'filter',
    aliases: ['fil'],
    description: 'Aplique um filtro de aúdio à queue!',
    slash: false,
    testOnly: false,
    callback: ({ message, args }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM');

        const queue = distube.getQueue(message);

        const embed = new MessageEmbed();
        
        if (!queue) 
        {
            embed
            .setDescription('Não tenho como aplicar filtros a uma queue vazia!')
            .setColor('RED');
        }
        else if (!args[0]) 
        {
            let filterDesc = '';

            for (let i = 0; i < Object.keys(distube.filters).length; i++)
            {
                filterDesc += `\`${Object.keys(distube.filters)[i]}\``;

                if (i !== Object.keys(distube.filters).length - 1) filterDesc += ', ';

                if (i === 4 || i === 9 || i === 14) filterDesc += '\n';
            }

            embed
            .setDescription(`**Filtro atual:** \`${queue.filter || 'nenhum'}\`\n\n` + 
            '**Filtros disponíveis ⮯**\n' + 
            filterDesc)
            .setColor('BLUE');
        }
        else if (args[0] === 'off' || args[0] === queue.filter)
        {
            if (!queue.filter) 
            {
                embed
                .setDescription('A queue não tem um filtro para ser removido!')
                .setColor('RED');
            }
            else
            {
                distube.setFilter(message, queue.filter);
                
                embed
                .setDescription(`O filtro da queue foi removido por: ${message.author}`)
                .setColor('BLUE');
            }
        }
        else
        {
            let success = true;

            try 
            { 
                distube.setFilter(message, args[0]); 
            }
            catch 
            {
                success = false; 
            }

            if (success)
            {
                embed
                .setDescription(`O filtro \`${queue.filter}\` foi aplicado à queue por ${message.author}`)
                .setColor('BLUE');
            }
            else
            {
                embed
                .setDescription('Filtro inválido! use `>filter` para ver os filtros disponíveis.')
                .setColor('RED');
            }
        }

        return message.channel.send(embed);
    },
};