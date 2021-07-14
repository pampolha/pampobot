const { MessageEmbed } = require('discord.js');
const { connectionErrorEmbed } = require('../connectionErrorEmbed');
const { discordReplace } = require('../discordReplace');
const { playOrAdd } = require('./playOrAdd');

const embed = new MessageEmbed();

const distubeEvents = distube =>
{
    distube.on('playSong', (message, queue, song) => 
    {
        return playOrAdd(message, queue, song);
    });

    distube.on('addSong', (message, queue, song) =>
    {
        return playOrAdd(message, queue, song);
    });

    distube.on('playList', (message, queue, playlist, song) =>
    { 
        return playOrAdd(message, queue, song, playlist);
    });
    
    distube.on('addList', (message, queue, playlist) => 
    {
        embed
        .setDescription(`A playlist "${discordReplace(playlist.name)}" - \`${playlist.formattedDuration}\`\n` +
        `Foi adicionada à queue por: ${playlist.user}\n` +
        `Número de músicas nessa playlist: ${playlist.songs.length}`)
        .setColor('BLUE');
        
        return message.channel.send(embed);
    });

    distube.on('finish', message => 
    {
        embed
        .setDescription('A queue ficou vazia, logo a transmissão foi encerrada.')
        .setColor('RED')
        .setTimestamp();

        message.channel.send(embed);
    });

    distube.on('initQueue', queue => 
    {
        queue.autoplay = false;
        queue.volume = 15;
    });

    distube.on('error', (message, err) =>
    {
        if (err.message.includes('User is not in the voice channel')) 
        {
            embed
            .setDescription('Você precisa estar um um canal de voz para usar esse comando!')
            .setColor('RED');
            
            return message.channel.send(embed);
        }
        else if (err.message.includes('DisTube cannot join the voice channel')) 
        {
            embed
            .setDescription('Eu não tenho permissão para entrar no seu canal de voz!')
            .setColor('RED');
            
            return message.channel.send(embed);
        }
        else if (err.message.includes('No video id found'))
        {
            embed
            .setDescription('Eu não consigo tocar essa música. Escolha outra opção quando pesquisar novamente!')
            .setColor('RED');
            
            return message.channel.send(embed);
        }
        else if (err.message.includes('Unsupported URL'))
        {
            embed
            .setDescription('Eu apenas posso acessar links do YouTube!')
            .setColor('RED');
            
            return message.channel.send(embed);
        }
        else if (err.message.includes('No result'))
        {
            embed
            .setDescription(`Nenhum resultado foi encontrado na pesquisa por "${message.content}"!`)
            .setColor('RED');
            
            return message.channel.send(embed);
        }
        else
        {
            connectionErrorEmbed(err, message);
        }
    });
};

module.exports = { distubeEvents };