const { logSlash } = require('../../functions/common/logSlash');
const { checkDM } = require('../../functions/common/checkDM');

const random = require('random');

const fs = require('fs');

require('dotenv').config();

const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'jokenpo',
    aliases: ['j'],
    description: 'Jogue uma disputa de pedra, papel e tesoura comigo!',
    slash: 'both',
    testOnly: false,
    expectedArgs: '<escolha>',
    callback: ({ message, args, interaction }) =>
    {  
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        if (!message) logSlash(interaction);

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

        const botNumber = random.int(1, 3);
        const result = botNumber - userNumber;

        const botMaoDefinida = definirMao(botNumber);
        const userMaoDefinida = definirMao(userNumber);

        const embed = new MessageEmbed().setColor('BLUE');

        if (result === 0)
        {
            embed.setDescription(`Você jogou: **${userMaoDefinida}**, e eu joguei: **${botMaoDefinida}!**\n` + 'Empate.');

            if (message) return message.channel.send(embed);
            else return embed;
        }
        else if (result === 1 || result === -2)
        {
            const wins = process.env.pampobotDir + 'data/jokenpoWins.txt';
            const antigo = fs.readFileSync(wins, 'utf-8');
            const atual = (parseInt(antigo, 10) + 1).toString(10);
            fs.writeFileSync(wins, atual);

            embed.setDescription(`Você jogou: **${userMaoDefinida}**, e eu joguei: **${botMaoDefinida}!**\n` + '***EU VENCI!***')
            .setFooter(`Meu número de vitórias agora é: ${fs.readFileSync(wins)}!`);

            if (message) return message.channel.send(embed);
            else return embed;
        }
        else 
        {
            embed.setDescription(`Você jogou: **${userMaoDefinida}**, e eu joguei: **${botMaoDefinida}!**\n` + '*e-eu perdi?!*');
            if (message) return message.channel.send(embed);
            else return embed;
        }
    },
};

const syntaxError = (msg = undefined) =>
{
    const errorEmbed = new MessageEmbed()
    .setColor('RED')
    .setDescription('Argumento inválido! Escolha pedra, papel ou tesoura após o comando!');

    if (msg) return msg.channel.send(errorEmbed);
    else return errorEmbed;
};

const definirMao = numero =>
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