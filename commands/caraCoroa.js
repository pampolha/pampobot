const { logSlash } = require('../functions/logSlash');
const { checkDM } = require('../functions/checkDM');

const random = require('random');
const { MessageEmbed } = require('discord.js');

module.exports = 
{
    name: 'caracoroa',
    aliases: ['c', 'cc'],
    description: 'Jogue uma moeda e veja o resultado!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        let moeda;
		const resultado = random.bool();
		switch (resultado)
        {
		case true:
            moeda = 'cara';
            break;
		case false:
			moeda = 'coroa';
            break;
		}

        const embed = new MessageEmbed().setColor('BLUE')
        .setDescription(`A face para cima foi: ***${moeda}!***`);
        
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