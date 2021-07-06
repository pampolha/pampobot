const { checkDM } = require('../../functions/checkDM');

const { distube } = require('../../functions/distubeClient');

module.exports =
{
    name: 'skip',
    aliases: ['sk'],
    description: 'Pule a música atual da queue!',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM.');

        const queue = distube.getQueue(message);

        if (queue.songs.length < 1) return message.reply('eu não tenho como pular para a próxima música!');
        
        message.channel.send(`"**${queue.songs[0].name.replaceAll(/\|\||~~|[*`]|^> /gim, '\u200B')}**" - \`${queue.songs[0].formattedDuration}\` foi pulado por ${message.author}`);
        
        return distube.skip(message);
    },
};