const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distubeClient');

module.exports =
{
    name: 'volume',
    description: 'Ajuste o volume da queue!',
    slash: false,
    testOnly: false,
    callback: ({ message, args }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM');

        const queue = distube.getQueue(message);
        
        if (!queue) return message.reply('não tenho como mudar o volume de uma queue vazia!');

        if (!args[0]) return message.reply(`o volume atual da queue é: **${queue.volume}%**`);

        const newVolume = parseInt(args[0], 10);
        
        if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) return message.reply('o volume  pode ser definido apenas com um número de 0 a 100!');
        
        distube.setVolume(message, newVolume);

        return message.channel.send(`O volume da queue foi definido em **${queue.volume}%** por ${message.author}`);
    },
};