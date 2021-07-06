const { distube } = require('../../functions/distubeClient');

const { checkDM } = require('../../functions/checkDM');

module.exports =
{
    name: 'play',
    aliases: ['p'],
    description: 'Vou proucurar uma música (ou seguir um link) e mostrar os resultados da pesquisa!',
    slash: false,
    testOnly: false,
    callback: ({ message, text }) =>
    {
        if (checkDM(message)) return console.log('Comando bloquado na DM.');

        if (!text) return message.reply('você precisa especificar um link ou texto para ser pesquisado!');

        if (!message.member.voice) return message.reply('você precisa estar em um canal de voz para usar esse comando!');

        message.react('🆗');

        return distube.play(message, text);
    },
};