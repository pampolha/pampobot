const { distube } = require('../distube/distubeClient');
const { discordReplace } = require('./discordReplace');
const { MessageEmbed } = require('discord.js');
const { connectionErrorEmbed } = require('../errors/connectionErrorEmbed');

const musicSearch = (text, embed, message) => {
    distube.search(text).then(result =>
        {
            let resultDesc = '';

            result = result.filter(element => element.url && element.formattedDuration);

            for (let i = 0; i < 5; i++) 
            {
                resultDesc += `**(${i + 1})** ⮯` + '\n' + `**"**${discordReplace(result[i].name)}**"** - \`${result[i].formattedDuration}\`` + '\n\n';  
            }

            embed
            .setTitle(`Resultados da pesquisa por "${text}":`)
            .setDescription(resultDesc)
            .setFooter('Digite um número de 1 a 5 para escolher a música.' + '\n' + 'A busca será cancelada ao inserir outra coisa ou esperar 1 minuto.')
            .setColor('BLUE');

            message.channel.send(embed).then(() =>
            {
                const filter = msg => (msg.author.id === message.author.id);
    
                const collector = message.channel.createMessageCollector(filter, { time: 1000 * 60, max: 1 });

                collector.once('end', collected =>
                {
                    collected = collected.map(msg => msg);

                    let chosenIndex;
                    if (collected[0]) chosenIndex = collected[0].content.match(/[12345]/);

                    if (chosenIndex)
                    {
                        chosenIndex = parseInt(chosenIndex, 10) - 1;

                        collected[0].react('🆗');

                        return distube.play(message, result[chosenIndex])
                        .catch(err => connectionErrorEmbed(err, message));
                    }
                    else
                    {
                        const cancelEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`A busca por "${text}" foi cancelada.`);

                        return message.channel.send(cancelEmbed);
                    }
                });
            });
        })
        .catch(err =>
        {
            return connectionErrorEmbed(err, message);
        });
};

module.exports = { musicSearch };