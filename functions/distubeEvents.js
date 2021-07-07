const { MessageEmbed } = require('discord.js');

const distubeEvents = distube =>
{
    distube.on('searchResult', (message, result) => 
    {
        const embed = new MessageEmbed().setTitle('***Resultados da pesquisa:***').setFooter('Digite um dos números acima. Para cancelar, insira qualquer outra coisa ou espere um minuto.');

        result = result.slice(0, 5);
        result.forEach((song, index) =>
        {
            embed.addField(`${index + 1}:`, `"**${song.name.replace(/\|\||~~|[*`]|^> /gim, '\u200B')}**" - \`${song.formattedDuration}\``);
        });

        return message.channel.send(embed);
    });
    
    distube.on('searchCancel', message =>
    {
        return message.reply('*a busca por músicas foi cancelada.*');
    });

    distube.on('addSong', (message, queue, song) =>
    {
        return message.channel.send(`"**${song.name.replace(/\|\||~~|[*`]|^> /gim, '\u200B')}**" - \`${song.formattedDuration}\` foi adicionado à queue por: ${song.user}`);
    });
    
    distube.on('addList', (message, queue, playlist) => 
    {
        return message.channel.send(`A playlist "**${playlist.name}**" *(${playlist.songs.length} músicas)* foi adicionada à queue por: ${playlist.user}`);
    });

    distube.on('finish', message => 
    {
        message.channel.send('*A queue ficou vazia, então eu encerrei a música!*');
    });

    distube.on('initQueue', queue => 
    {
        queue.autoplay = false;
        queue.volume = 15;
    });

    distube.on('playSong', (message, queue, song) =>
    {
        const embed = new MessageEmbed().setTitle('*Tocando agora:*')
        .addField(`"**${song.name.replace(/\|\||~~|[*`]|^> /gim, '\u200B')}**" - \`${song.formattedDuration}\``, `pedido por ${song.user}`)
        .setURL(song.url);

        return message.channel.send(embed);
    });

    distube.on('error', (message, err) =>
    {
        if (err.message.includes('User is not in the voice channel')) 
        {
            return message.reply('você precisa estar um um canal de voz para usar esse comando!');
        }
        else if (err.message.includes('DisTube cannot join the voice channel')) 
        {
            return message.reply('eu não tenho permissão para entrar no seu canal de voz!');
        }
        else if (err.message.includes('No video id found'))
        {
            return message.reply('eu não consigo tocar essa música. Escolha outra opção quando pesquisar novamente!');
        }
        else if (err.message.includes('Unsupported URL'))
        {
            return message.reply('eu só posso acessar links do youtube!');
        }
        else if (err.message.includes('No result'))
        {
            return message.reply('nenhum resultado encontrado para a pesquisa!');
        }
        else
        {
            console.error(err); 
            return message.reply('*Ops, parece que um erro ocorreu ao executar o comando. O desenvolvedor foi notificado!*');
        }
    });
};

module.exports = { distubeEvents };