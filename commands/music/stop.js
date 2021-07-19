const { distube } = require('../../functions/distube/distubeClient');

const { checkDM } = require('../../functions/common/checkDM');
const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'stop',
    aliases: ['exit'],
    description: 'Vou parar a música, limpar a queue e sair do canal de voz.',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    {
        if (checkDM(message)) return console.log('Comando bloquado na DM.');
        
        const queue = distube.getQueue(message);
        
        const embed = new MessageEmbed();

        if (!queue)
        {
            embed
            .setDescription('Eu não tenho uma queue para parar!')
            .setColor('RED');
        }
        else
        {
            distube.stop(message);

            embed
            .setDescription(`A queue foi encerrada por ${message.author}`)
            .setColor('BLUE')
            .setTimestamp(); 
        }
        
        return message.channel.send(embed);
    },
};