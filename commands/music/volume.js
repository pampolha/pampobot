const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distube/distubeClient');

module.exports =
{
    name: 'volume',
    aliases: ['vl'],
    description: 'Ajuste o volume da queue!',
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
            .setDescription('Uma queue vazia não possui volume!')
            .setColor('RED');
        }
        else if (!args[0]) 
        {
            embed
            .setDescription(`Volume atual da queue: **${queue.volume}%**`)
            .setColor('BLUE');
        }
        else
        {
            const newVolume = parseInt(args[0], 10);
        
            if (isNaN(newVolume) || newVolume < 0 || newVolume > 100) 
            {
                embed
                .setDescription('O volume é uma porcentagem de 0 a 100!')
                .setColor('RED');
            }
            else
            {
                distube.setVolume(message, newVolume);

                embed
                .setDescription(`O volume da queue foi alterado para: **${queue.volume}%**\n` + 
                `por ${message.author}`)
                .setColor('BLUE');
            }
        }

        return message.channel.send(embed);
    },
};