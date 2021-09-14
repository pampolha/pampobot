const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/common/checkDM');
const { discordReplace } = require('../../functions/common/discordReplace');

const { distube } = require('../../functions/distube/distubeClient');

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

        const embed = new MessageEmbed();

        if (!queue) 
        {
            embed
            .setDescription('Não há música para pular!')
            .setColor('RED');
        }
        else
        {
            if (queue.repeatMode !== 0)
            {
              distube.setRepeatMode(message, 0);

              embed.setDescription(`O loop da música atual foi desligado por pular ela.`)
              .setColor('BLUE')

              message.channel.send(embed);
            }

            distube.skip(message);
            
            embed
            .setDescription(`"${discordReplace(queue.songs[0].name)}" - \`${queue.songs[0].formattedDuration}\`\n` + 
            `Foi pulado por ${message.author}`)
            .setColor('BLUE');
        }

        return message.channel.send(embed);
    },
};