const { checkDM } = require('../functions/checkDM');

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

        embed.setTitle('A ajuda está aqui! >:)')
        .addFields(help)
        .setFooter('converse com o dev! -> pampolha#0007')
        .setColor('GREEN');


        return message.channel.send(embed).then(msg => 
        {
            msg.react('📄');

            setTimeout(() => 
            {
                msg.react('🎵');
            }, 1000 * 0.7);

            const filter1 = (reaction, user) => (reaction.emoji.name === '📄' || reaction.emoji.name === '🎵') && user.id === message.author.id;
            const filter2 = (reaction, user) => (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡') && user.id === message.author.id;

            const collector1 = msg.createReactionCollector(filter1, { time: 1000 * 60, max: 1, dispose : true });

            collector1.once('collect', reaction =>
            {
                const choice = reaction.emoji.name;
                
                const meu = choice === '📄' ? texto : musica;
                
                let paginaAtual = 0;

                attPagina(embed, msg, choice, meu, paginaAtual);

                setTimeout(() => 
                {
                    msg.reactions.removeAll().catch();

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
                
                collector2.on('collect', _reaction =>
                {
                    if (_reaction.emoji.name === '⬅')
                    {
                        paginaAtual--;

                        if (paginaAtual < 0) paginaAtual = meu.length - 1;
                        else if (paginaAtual >= meu.length) paginaAtual = 0;

                        attPagina(embed, msg, choice, meu, paginaAtual);
                    }
                    else
                    {
                        paginaAtual++;
                        
                        if (paginaAtual < 0) paginaAtual = meu.length - 1;
                        else if (paginaAtual >= meu.length) paginaAtual = 0;
                        
                        attPagina(embed, msg, choice, meu, paginaAtual);
                    }
                });

                collector2.on('remove', _reaction => 
                {
                    if (_reaction.emoji.name === '⬅')
                    {
                        paginaAtual--;

                        if (paginaAtual < 0) paginaAtual = meu.length - 1;
                        else if (paginaAtual >= meu.length) paginaAtual = 0;

                        attPagina(embed, msg, choice, meu, paginaAtual);
                    }
                    else
                    {
                        paginaAtual++;
                        
                        if (paginaAtual < 0) paginaAtual = meu.length - 1;
                        else if (paginaAtual >= meu.length) paginaAtual = 0;
                        
                        attPagina(embed, msg, choice, meu, paginaAtual);
                    }
                });
            });
        })
        .catch(err => console.error(err));
     },
 };

const attPagina = (embed, msg, choice, meu, paginaAtual) =>
{
    return msg.edit(embed.setAuthor('Legenda: `<>` são argumentos obrigatórios, `[]` são argumentos opcionais.')
    .setTitle(`*${choice}Comandos:*`)
    .spliceFields(0, embed.fields.length, meu[paginaAtual])
    .setFooter(`Página ${paginaAtual + 1}/${meu.length}`));
};

const help = { name: 'Instruções:', value: 'Para ver os comandos de texto, reaja com o emoji 📄!\n' +
'Para ver os comandos de música, reaja com o emoji 🎵!\n\n' +
'Para trocar de página, reaja com os emojis ⬅ ou ➡!', inline: false };

const texto =
[[{ name: 'Cara ou coroa:', value: 'Jogue uma moeda e veja o resultado usando: `>caracoroa | >c | >cc`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'Roll:', value: 'Jogue um dado com até um modificador usando: `>roll | >r [num. lados] [+, -, x, /] [num. modificador]`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'Out:', value: 'Vou imitar sua mensagem (e apagar ela, se eu tiver permissão) quando você usar: `>out | >o <mensagem>`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'Jokenpo:', value: 'Vou jogar uma disputa de jokenpo *(pedra, papel e tesoura)* com você quando você usar: `>jokenpo | >j <mão de escolha>`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false }],

[{ name: 'Lorem Ipsum:', value: 'Vou digitar um parágrafo aleatório com palavras do livro `De finibus bonorum et malorum`, de Cícero, que pode começar com a frase padrão `Lorem Ipsum...` ao usar o argumento literal ["li"], quando você usar: `>loremipsum | >li ["li"]`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'APOD:', value: 'Receba o APOD (Astronomical Picture Of the Day) da NASA usando: `>apod | >nasa`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'Motivação:', value: 'Vou tentar te motivar se você usar: `>motivação | >motivacao | >m`.' +
'\n*Suporte para comando de `/`:*  ✅', inline: false },
{ name: 'Sus:', value: '`>sus`...' +
'\n*Suporte para comando de `/`:*  ✅', inline: false }]];

const musica = 
[[{ name: 'Play:', value: 'Pesquise uma música no youtube e selecione o resultado usando: `>play | >p <link ou texto para pesquisar>`.', inline: false },
{ name: 'Play first:', value: 'Toque a primeira música encontrada com a pesquisa usando: `>playfirst | >playf | >pf <link ou texto para pesquisar>`.', inline: false },
{ name: 'Queue:', value: 'Veja a fila de músicas atual usando: `>queue | >fila | >q`.', inline: false },
{ name: 'Volume:', value: 'Ajuste o volume das músicas da queue usando: `>volume | >vl <número de 0 a 100>`.\n' +
'Para ver o volume atual, use apenas `>volume`.', inline: false }],

[{ name: 'Skip:', value: 'Pule a música atual da queue usando: `skip | >sk`.', inline: false },
{ name: 'Stop:', value: 'Termine a execução das músicas e limpe a queue usando: `>stop | >exit`.', inline: false },
{ name: 'Filter:', value: 'Aplique um filtro de áudio à queue atual usando: `>filter | >fil <nome do filtro>`.\n' +
'Para ver o filtro atual e os disponíveis, use apenas `>filter`.', inline: false },
{ name: 'Clear:', value: 'Limpe todas as músicas da queue, deixando apenas a música atual usando: `>clear | >cl`.', inline: false }]];