const { logSlash } = require('../../functions/common/logSlash');
const { checkDM } = require('../../functions/common/checkDM');

require('dotenv').config();

const { affirmations } = require(process.env.pampobotDir + 'data/commands/affirmations.js');

const random = require('random');

const { MessageEmbed } = require('discord.js');

module.exports =
{
    name: 'motivação',
    aliases: ['m', 'motivacao'],
    description: 'Receba uma mensagem verdadeira que eu escolhi para você!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');
        
        const frase = random.int(0, (affirmations.length - 1));

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**${affirmations[frase]}**`);

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