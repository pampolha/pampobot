const { logSlash } = require('../functions/logSlash');
const { checkDM } = require('../functions/checkDM');

const random = require('random');

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
        
        if (message)
        {
            return message.channel
            .send(`<@${message.author.id}> jogou uma moeda, e o face para cima foi: ***${moeda}!***`);
        }
        else
        {
            logSlash(interaction);
            
            return `A face para cima foi: ***${moeda}!***`;
        }
	},
};