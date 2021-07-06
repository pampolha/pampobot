const { distube } = require('../../functions/distubeClient');

const { checkDM } = require('../../functions/checkDM');

module.exports =
{
    name: 'stop',
    aliases: ['exit'],
    description: 'Vou parar de tocar qualquer música que eu estiver tocando, vou limpar a queue e irei sair do canal de voz.',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    {
        if (checkDM(message)) return console.log('Comando bloquado na DM.');
        
        try { distube.stop(message); }
        catch(err) { return message.reply('eu não estou tocando nenhuma música no momento!'); }
        
        return message.reply('a música foi encerrada e a queue foi limpa.');
    },
};