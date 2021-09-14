const { distube } = require('../../functions/distube/distubeClient');

const { checkDM } = require('../../functions/common/checkDM');
const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'loop',
    aliases: ['lp'],
    description: 'Vou colocar a música atual em loop.',
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
            .setDescription('Não existe nenhuma música tocando no momento!')
            .setColor('RED');
        }
        else
        {
            if (queue.repeatMode === 0)
            {
              distube.setRepeatMode(message, 1);
      
              embed.setDescription(`O loop da música atual foi ligado por ${message.author}`);
            }
            else
            {
              distube.setRepeatMode(message, 0);

              embed.setDescription(`O loop da música atual foi desligado por ${message.author}`);
            }

            embed
            .setColor('BLUE')
            .setTimestamp(); 
          }
        
        return message.channel.send(embed);
    },
};