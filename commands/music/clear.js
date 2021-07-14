const { distube } = require('../../functions/distube/distubeClient');

const { checkDM } = require('../../functions/checkDM');
const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'clear',
    aliases: ['cl'],
    description: 'Vou parar a limpar a queue, deixando apenas a música atual.',
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
            .setDescription('Eu não tenho uma queue para limpar!')
            .setColor('RED');
        }
        else
        {
            queue.songs.splice(1);

            embed
            .setDescription(`A queue foi limpa por ${message.author}`)
            .setColor('BLUE')
            .setTimestamp(); 
        }
        
        return message.channel.send(embed);
    },
};