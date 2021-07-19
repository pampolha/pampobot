const { MessageEmbed } = require('discord.js');
const { checkDM } = require('../../functions/common/checkDM');
const { discordReplace } = require('../../functions/common/discordReplace');
const { distube } = require('../../functions/distube/distubeClient');

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
        .setAuthor('Queue');

        if (!queue) 
        {
            embed
            .setDescription('A queue está vazia!')
            .setColor('RED');

            return message.channel.send(embed);
        }
        else
        {
            const songDesc = [];

            let i = 0;
            let h = 0;

            queue.songs.forEach((song, index) => 
            {
                if (i !== 0 && i % 5 === 0) h++;
                if (i % 5 === 0) songDesc[h] = '';

                songDesc[h] += `**${index === 0 ? '[ Música atual ]' : '[ ' + (index + 1) + ' ]'} ⮯**\n` + 
                `"${discordReplace(song.name)}" - \`${song.formattedDuration}\`\n` +
                `Pedido por: ${song.user}` + 
                '\n\n';
                
                i++;
            });

            let paginaAtual = 0;

            embed
            .setDescription(songDesc[paginaAtual])
            .setFooter(attFooter(paginaAtual, queue, h))
            .setColor('BLUE');

            if (h === 0) 
            {
                return message.channel.send(embed);
            }
            else
            {                
                message.channel.send(embed)
                .then(msg =>
                {   
                    msg.react('⬅');

                    setTimeout(() => 
                    {
                        msg.react('➡');
                    }, 1000 * 1);

                    const filter = (reaction, user) => (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡') && user.id === message.author.id;

                    const collector = msg.createReactionCollector(filter, { time: 1000 * 60, dispose: true });

                    collector.on('collect', reaction =>
                    {
                        const choice = reaction.emoji.name;

                        if (choice === '⬅')
                        {
                            paginaAtual--;

                            if (paginaAtual < 0) paginaAtual = h;
                            else if (paginaAtual > h) paginaAtual = 0;
                        
                            return editEmbed(embed, msg, songDesc, paginaAtual, queue, h);
                        }
                        else
                        {
                            paginaAtual++;

                            if (paginaAtual < 0) paginaAtual = h;
                            else if (paginaAtual > h) paginaAtual = 0;

                            return editEmbed(embed, msg, songDesc, paginaAtual, queue, h);
                        }
                    });

                    collector.on('remove', reaction =>
                    {
                        const choice = reaction.emoji.name;

                        if (choice === '⬅')
                        {
                            paginaAtual--;

                            if (paginaAtual < 0) paginaAtual = h;
                            else if (paginaAtual > h) paginaAtual = 0;
                        
                            return editEmbed(embed, msg, songDesc, paginaAtual, queue, h);
                        }
                        else
                        {
                            paginaAtual++;

                            if (paginaAtual < 0) paginaAtual = h;
                            else if (paginaAtual > h) paginaAtual = 0;

                            return editEmbed(embed, msg, songDesc, paginaAtual, queue, h);
                        }
                    });
                });
            }
        }
	},
};

const editEmbed = (embed, msg, songDesc, paginaAtual, queue, h) => 
{
    return msg.edit(embed.setDescription(songDesc[paginaAtual])
        .setFooter(attFooter(paginaAtual, queue, h)));
};

const attFooter = (paginaAtual, queue, h) => 
{
    return `Duração total da queue: ${queue.formattedDuration}\n` +
    `O autoplay está ${queue.autoplay ? 'ligado' : 'desligado'}\n` + 
    `Página atual: ${paginaAtual + 1}/${h + 1}`;
};