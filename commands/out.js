const { checkDM } = require('../functions/checkDM');
const { logSlash } = require('../functions/logSlash');

module.exports =
{
    name: 'out',
    aliases: ['o'],
    description: 'Vou tentar copiar a mensagem que você escrever!',
    slash: 'both',
    testOnly: false,
    minArgs: 1,
    expectedArgs: '<mensagem>',
    callback: ({ message, text, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        const out = text;

        if (!out) return;

        if (message)
        {
            if (message.deletable) 
            {
                message.delete().catch(err => console.error(err));
                console.log(`pampobot apagou uma mensagem no canal "${message.channel.name}" do servidor "${message.guild.name}". Mensagem original: "${out}"`);
            }

            return message.channel.send(out);
        }
        else
        {
            logSlash(interaction);

            return out;
        }
	},
};