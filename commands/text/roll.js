const { MessageEmbed } = require('discord.js');
const random = require('random');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');

module.exports =
{
    name: 'roll',
    aliases: ['r'],
    description: 'Role um dado com até um modificador e veja o resultado!',
    slash: 'both',
    testOnly: false,
    expectedArgs: '[lados] [operador] [modificador]',
    callback: ({ message, args, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        let lado;

        if (!args[0])
        {
            lado = 6;
        }
        else
        {
            lado = parseInt(args[0].trim(), 10);

            if (isNaN(lado) || lado <= 1 || lado >= Number.MAX_SAFE_INTEGER)
            {
                return syntaxError(message);
            }
        }

        const dado = random.int(1, lado);

        let resultado;
        
        if (args[1] && args[2])
        {
            const mod = parseInt(args[2].trim(), 10);

            if (isNaN(mod) || mod <= 0 || mod >= Number.MAX_SAFE_INTEGER)
            {
                return syntaxError(message);
            }

            const regex = /[+\-x/]/;

            const operador = args[1].match(regex);
            
            if (!operador) return syntaxError(message);
            
            switch (operador[0].trim())
            {
                case '+':
                    resultado = `Um **D${lado}+${mod}** foi jogado, e o resultado foi: *(${dado}+${mod})* = ***${dado + mod}!***`; 
                    break;
                case '-':
                resultado = `Um **D${lado}-${mod}** foi jogado, e o resultado foi: *(${dado}-${mod})* = ***${dado - mod}!***`;
                    break;
                case 'x':
                    resultado = `Um **D${lado}x${mod}** foi jogado, e o resultado foi: *(${dado}x${mod})* = ***${dado * mod}!***`;
                    break;
                case '/':
                resultado = `<Um **D${lado}/${mod}** foi jogado, e o resultado foi: *(${dado}/${mod})* = ***${Math.floor(dado / mod)}!*** *(arredondado para baixo)*`;
                    break;
            }
        } 
        else
        {
            resultado = `Um **D${lado}** foi jogado, e o resultado foi: ***${dado}!***`;
        }

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(resultado)
        .setFooter(natural(dado, lado));
        
        if (message) 
        {
            return message.channel.send(embed);
        }
        else
        {
            logSlash(interaction);
            return embed;
        }
    },
};

const natural = (dado, lado) =>
{
    if (dado === lado) return `Natural ${lado}!!`;
    else return '';
};

const syntaxError = (msg = undefined) =>
{
    const errorEmbed = new MessageEmbed()
    .setDescription('Número de lados/modificador inválido! Escolha um número inteiro de valor maior que 1 e menor que 2^53-1.' +
    '\nCaso queira aplicar um modificador, escolha entre "+","-","x" ou "/" e depois um número que siga as mesmas condições do número de lados, separando com espaços!')
    .setColor('RED');

    if (msg) return msg.channel.send(errorEmbed);
    else return errorEmbed;
};