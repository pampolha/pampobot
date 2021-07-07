const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distubeClient');

module.exports =
{
    name: 'filter',
    description: 'Aplique um filtro de aúdio à queue!',
    slash: false,
    testOnly: false,
    callback: ({ message, args }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM');

        const queue = distube.getQueue(message);
        
        if (!queue) return message.reply('não tenho como aplicar filtros a uma queue vazia!');

        if (!args[0]) return message.channel.send(`**Filtro atual:** \`${queue.filter || 'nenhum'}\` \n*Os filtros disponíveis são: \`${Object.keys(distube.filters).join('`, `')}\`*`);
        
        if (args[0] === 'off')
        {
            if (!queue.filter) return message.reply('a queue não tem um filtro para ser removido.');

            distube.setFilter(message, queue.filter);
            return message.channel.send(`O filtro da queue foi removido por: ${message.author}`);
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
                message.reply('filtro inválido! use `>filter` para ver os filtros disponíveis.'); 
            }

            if (success === true) return message.channel.send(`O filtro \`${queue.filter}\` foi aplicado à queue por: ${message.author}`);
        }
    },
};