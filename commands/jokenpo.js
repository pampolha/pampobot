const { logSlash } = require('../functions/logSlash');
const { checkDM } = require('../functions/checkDM');

require ('dotenv').config();

const random = require('random');

const fs = require('fs');

const syntaxError = (msg = undefined) =>
        {
            const response = 'Argumento inválido! Escolha pedra, papel ou tesoura após o comando!';
            if (msg) return msg.reply(response);
            else return response;
        };

module.exports =
{
    name: 'jokenpo',
    aliases: ['j'],
    description: 'Jogue uma disputa de pedra, papel e tesoura comigo!',
    slash: 'both',
    testOnly: false,
    expectedArgs: '<escolha>',
    minArgs: 1,
    callback: ({ message, args, interaction }) =>
    {  
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');
        logSlash(interaction);

        let userNumber;
        if (args[0])
        {
            switch (args[0].toLowerCase()) 
            {
                case 'pedra':
                    userNumber = 1;
                    break;
                case 'papel':
                    userNumber = 2;
                    break;
                case 'tesoura':
                    userNumber = 3;
                    break;
                default:
                    return syntaxError(message);
            }
        }
        else
        {
            return syntaxError(message);
        }

        const mao = numero =>
        {
            switch (numero) 
            {
                case 1:
                    return 'pedra';
                case 2:
                    return 'papel';
                case 3:
                    return 'tesoura';
            }
        };

        const botNumber = random.int(1, 3);
        const result = botNumber - userNumber;

        const botMao = mao(botNumber);
        const userMao = mao(userNumber);

        if (result === 0)
        {
            const empate = `você jogou: **${userMao}**, e eu joguei: **${botMao}!** Empate.`;
            if (message) return message.reply(empate);
            else return empate;
        }
        else if (result === 1 || result === -2)
        {
            const wins = process.env.pampobotDir + 'data/jokenpoWins.txt';
            const antigo = fs.readFileSync(wins, 'utf-8');
            const atual = (parseInt(antigo, 10) + 1).toString(10);
            fs.writeFileSync(wins, atual);

            const vitoria = `você jogou: **${userMao}**, e eu joguei: **${botMao}!** ***EU VENCI!***\n` + 
            `> *Meu número de vitórias agora é:*  **${fs.readFileSync(wins)}!**`;

            if (message) return message.reply(vitoria);
            else return vitoria;
        }
        else
        {
            const derrota = `você jogou: **${userMao}**, e eu joguei: **${botMao}!** *e-eu perdi?!*`;
            if (message) return message.reply(derrota);
            else return derrota;
        }
    },
};