const { distube } = require('../../functions/distube/distubeClient');

const { checkDM } = require('../../functions/common/checkDM');
const { MessageEmbed } = require('discord.js');
const { playSpotify } = require('../../functions/common/playSpotify');
const { musicSearch } = require('../../functions/common/musicSearch');

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

        const embed = new MessageEmbed();

        if (!text) 
        {
            embed
            .setDescription('você precisa especificar um link ou texto para ser pesquisado!')
            .setColor('RED');

            return message.channel.send(embed);
        }
        else if (!message.member.voice) 
        {   
            embed
            .setDescription('você precisa estar em um canal de voz para usar esse comando!')
            .setColor('RED');

            return message.channel.send(embed);
        }
        else if (text.startsWith('https://www.youtube.com/watch?v') || text.startsWith('https://www.youtube.com/playlist?list'))
        {
            distube.play(message, text);
        }
        else if (text.startsWith('https://open.spotify.com/'))
        {
            return playSpotify(message, text);
        }
        else
        { 
            return musicSearch(text, embed, message);
        }
    },
};