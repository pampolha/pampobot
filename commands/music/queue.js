const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/checkDM');
const { distube } = require('../../functions/distubeClient');

module.exports =
{
    name: 'queue',
    aliases: ['q', 'fila'],
    description: 'Mostrar a queue de músicas atual.',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    {
        if (checkDM(message)) return console.log('Comando bloquado na DM.');

        const queue = distube.getQueue(message);

        const embed = new MessageEmbed()
        .setTitle('***Queue atual:***');

        if (!queue) return message.reply(embed.addField('**A queue está vazia!**', '*adicione alguma música usando ">play"!*'));

        queue.songs.forEach((song, index) => 
        {
            embed.addField(`**${index === 0 ? index = 'Tocando agora' : index + 1 + '°'}**:`, 
            `"**${song.name.replaceAll(/\|\||~~|[*`]|^> /gim, '\u200B')}**" - \`${song.formattedDuration}\`\n` +
            `*pedido por: ${song.user}*`);
        });

        embed.setFooter(`Duração total da queue: ${queue.formattedDuration}`);
        
        return message.channel.send(embed);
	},
};