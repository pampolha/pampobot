const { distube } = require('../../functions/distube/distubeClient');

const { checkDM } = require('../../functions/common/checkDM');
const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'playfirst',
    aliases: ['pf', 'playf'],
    description: 'Vou proucurar uma música (ou seguir um link) e tocar ela no canal de voz que você estiver!',
    slash: false,
    testOnly: false,
    callback: ({ message, text }) =>
    {
        if (checkDM(message)) return console.log('Comando bloquado na DM.');

        const embed = new MessageEmbed();

        if (!text) 
        {
            embed
            .setDescription('Você precisa especificar um link ou texto para ser pesquisado!')
            .setColor('RED');

            return message.channel.send(embed);
        }
        else if (!message.member.voice) 
        {   
            embed
            .setDescription('Você precisa estar em um canal de voz para usar esse comando!')
            .setColor('RED');

            return message.channel.send(embed);
        }
        else if (text.startsWith('https://'))
        {
            distube.play(message, text);
        }
        else
        {
            message.react('🆗');

            return distube.search(text).then(result =>
            {
                result = result.filter(element => element.formattedDuration);

                return distube.play(message, result[0]);
            });
        }
    },
};