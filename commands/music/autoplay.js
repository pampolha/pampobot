const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distube/distubeClient');

module.exports =
{
    name: 'autoplay',
    aliases: ['ap'],
    description: 'Liga/desliga o autoplay da queue!',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM');

        const queue = distube.getQueue(message);

        const embed = new MessageEmbed();
        
        if (!queue) 
        {
            embed
            .setDescription('Nao há uma queue para ligar o autoplay!')
            .setColor('RED');
        }
        else
        {
            const autoplay = queue.autoplay;
        
            if (!autoplay) 
            {
                queue.autoplay = true;

                embed
                .setDescription('O autoplay da queue foi **ligado**\n' +
                `por ${message.author}`)
                .setColor('BLUE')
                .setTimestamp();
            }
            else
            {
                queue.autoplay = false;

                embed
                .setDescription('O autoplay da queue foi **desligado**\n' +
                `por ${message.author}`)
                .setColor('BLUE')
                .setTimestamp();
            }
        }

        return message.channel.send(embed);
    },
};