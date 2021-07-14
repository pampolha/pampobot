const { MessageEmbed } = require('discord.js');
const { discordReplace } = require('../discordReplace');

const playOrAdd = (message, queue, song, playlist = undefined) =>
{
    const embed = new MessageEmbed().setColor('BLUE');

    if (!queue || queue.songs[0] === song)
    {
        if (playlist)
        {
            embed
            .setTitle('Tocando agora:')
            .setDescription(`Playlist "${discordReplace(playlist.name)}" - \`${playlist.formattedDuration}\`\n` + 
            `Pedida por: ${playlist.user}`)
            .setFooter(`Número de músicas nessa playlist: ${playlist.songs.length}\n` +
            `O autoplay está ${queue.autoplay ? 'ligado' : 'desligado'}`)
            .setColor('BLUE');
        }
        else
        {
            embed
            .setTitle('Tocando agora:')
            .setDescription(`"${discordReplace(song.name)}" - \`${song.formattedDuration}\`\n` + 
            `Pedido por ${message.author}`)
            .setFooter(`Número de músicas restantes na queue: ${queue.songs.length - 1}\n` +
            `O autoplay está ${queue.autoplay ? 'ligado' : 'desligado'}`)
            .setURL(song.url); 
        }
    }
    else
    {
        embed
        .setDescription(`"${discordReplace(song.name)}" - \`${song.formattedDuration}\`\n` + 
        `Foi adicionado à queue por: ${message.author}`)
        .setFooter(`Número de músicas a serem tocadas antes dessa: ${queue.songs.length - 1}`);
    }

    return message.channel.send(embed);
};

module.exports = { playOrAdd };