const random = require('random');

const { checkDM } = require('../functions/checkDM');
const { logSlash } = require('../functions/logSlash');

const syntaxError = (msg = undefined) =>
        {
            const response = 'Número de lados/modificador inválido! Escolha um número inteiro de valor maior que 1 e menor que 2^53.' +
            '\nCaso queira aplicar um modificador, escolha entre "+","-","x" ou "/" e depois um número que não seja 0, separando com espaços!';
            if (msg) return msg.reply(response);
            else return response;
        };

const natural = (dado, lado) =>
{
    if (dado === lado) return `\n*Natural **${lado}**!!*`;
    else return '';
};

module.exports =
{
    name: 'roll',
    aliases: ['r'],
    description: 'Role um dado com até um modificador e veja o resultado!',
    slash: 'both',
    testOnly: false,
    expectedArgs: '<lados> [operador] [modificador]',
    callback: ({ message, args, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');
        logSlash(interaction);

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

        let mod;
        if (args[1] && args[2])
        {
            mod = parseInt(args[2].trim(), 10);
            if (isNaN(mod) || mod === 0 || mod >= Number.MAX_SAFE_INTEGER)
            {
                return syntaxError(message);
            }
        } 
        else
        {
            // eslint-disable-next-line no-lonely-if
            if (message) 
            {
                return message
                .reply(`Um **D${lado}** foi jogado, e o resultado foi: ***${dado}!***` + natural(dado, lado));
            }
            else 
            {
                return `Um **D${lado}** foi jogado, e o resultado foi: ***${dado}!***` + natural(dado, lado);
            }
        }  

        const regex = /[+\-x/]/;
        const operador = args[1].match(regex);
        if (!operador)
        {
            return syntaxError(message);
        }

        let resultado;
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

        if (message) return message.reply(resultado + natural(dado, lado));
        else return resultado + natural(dado, lado);
    },
};