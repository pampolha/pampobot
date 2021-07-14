const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/checkDM');
const { discordReplace } = require('../../functions/discordReplace');

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
            distube.skip(message);

            embed
            .setDescription(`"${discordReplace(queue.songs[0].name)}" - \`${queue.songs[0].formattedDuration}\`\n` + 
            `Foi pulado por ${message.author}`)
            .setColor('BLUE');
        }

        return message.channel.send(embed);
    },
};