const { checkDM } = require('../functions/checkDM');
const { texto } = require('../data/textCommands');
const { musica } = require('../data/musicCommands');

const Discord = require('discord.js');

module.exports =
{ 
    name: 'help',
    aliases: ['h'],
    description: 'Lista contendo os comandos do bot e as suas instruções!',
    slash: false,
    testOnly: false,
    callback: ({ message }) =>
    { 
        if (checkDM(message)) return console.log('Comando bloquado na DM.');
        
        const embed = new Discord.MessageEmbed();

        embed
        .setTitle('A ajuda está aqui! >:)')
        .addFields(help)
        .setFooter('converse com o dev! -> pampolha#8477')
        .setColor('GREEN');

        return message.channel.send(embed)
        .then(msg => 
        {
            msg.react('📄');

            setTimeout(() => 
            {
                msg.react('🎵');
            }, 1000 * 0.7);

            const filter1 = (reaction1, user) => (reaction1.emoji.name === '📄' || reaction1.emoji.name === '🎵') && user.id === message.author.id;
            const filter2 = (reaction1, user) => (reaction1.emoji.name === '⬅' || reaction1.emoji.name === '➡') && user.id === message.author.id;

            const collector1 = msg.createReactionCollector(filter1, { time: 1000 * 60, max: 1, dispose : true });

            collector1.once('collect', reaction1 =>
            {
                const choice = reaction1.emoji.name;
                
                const commands = choice === '📄' ? texto : musica;
                
                let paginaAtual = 0;

                attPagina(embed, msg, choice, commands, paginaAtual);

                setTimeout(() => 
                {
                    msg.reactions
                    .removeAll()
                    .catch(err => console.error(err));

                    setTimeout(() => 
                    {
                        msg.react('⬅');
                    }, 1000 * 0.7);

                    setTimeout(() => 
                    {
                        msg.react('➡');
                    }, 1000 * 1.5);

                }, 1000 * 0.7); 
                
                collector1.stop();

                const collector2 = msg.createReactionCollector(filter2, { time: 1000 * 120, dispose: true });
                
                collector2.on('collect', reaction2 =>
                {
                    if (reaction2.emoji.name === '⬅')
                    {
                        paginaAtual--;

                        if (paginaAtual < 0) paginaAtual = commands.length - 1;
                        else if (paginaAtual > commands.length - 1) paginaAtual = 0;

                        attPagina(embed, msg, choice, commands, paginaAtual);
                    }
                    else
                    {
                        paginaAtual++;
                        
                        if (paginaAtual < 0) paginaAtual = commands.length - 1;
                        else if (paginaAtual > commands.length - 1) paginaAtual = 0;
                        
                        attPagina(embed, msg, choice, commands, paginaAtual);
                    }
                });

                collector2.on('remove', reaction2 => 
                {
                    if (reaction2.emoji.name === '⬅')
                    {
                        paginaAtual--;

                        if (paginaAtual < 0) paginaAtual = commands.length - 1;
                        else if (paginaAtual > commands.length - 1) paginaAtual = 0;

                        attPagina(embed, msg, choice, commands, paginaAtual);
                    }
                    else
                    {
                        paginaAtual++;
                        
                        if (paginaAtual < 0) paginaAtual = commands.length - 1;
                        else if (paginaAtual > commands.length - 1) paginaAtual = 0;
                        
                        attPagina(embed, msg, choice, commands, paginaAtual);
                    }
                });
            });
        })
        .catch(err => console.error(err));
     },
 };

const attPagina = (embed, msg, choice, commands, paginaAtual) =>
{
    return msg.edit(embed.setAuthor('Legenda: `<>` são argumentos obrigatórios, `[]` são argumentos opcionais.')
    .setTitle(`${choice}Comandos:`)
    .spliceFields(0, embed.fields.length, commands[paginaAtual])
    .setFooter(`Página ${paginaAtual + 1}/${commands.length}`));
};

const help = { name: 'Instruções:', value: 'Para ver os comandos de texto, reaja com o emoji 📄!\n' +
'Para ver os comandos de música, reaja com o emoji 🎵!\n\n' +
'Para trocar de página, reaja com os emojis ⬅ ou ➡!', inline: false };