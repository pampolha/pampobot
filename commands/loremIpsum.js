const { checkDM } = require('../functions/checkDM');
const { logSlash } = require('../functions/logSlash');

const axios = require('axios').default;

const syntaxError = (msg = undefined) =>
        {
            const response = 'Argumento inválido! Insira "t" após o comando para obter um começo de parágrafo no padrão Lorem Ipsum.';
            if (msg) return msg.reply(response);
            else return response;
        };

module.exports =
{
    name: 'loremipsum',
    aliases: ['li'],
    description: 'Vou digitar um parágrafo aleatório com palavras do livro "De finibus bonorum et malorum", de Cícero.',
    slash: 'both',
    testOnly: false,
    expectedArgs: '[t]',
    callback: ({ message, args, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        if (message)
        {
            message.channel.startTyping();

            axios.get('https://loripsum.net/api/1/medium/plaintext')
            .then(li =>
                {
                    if (args[0] && args[0].toLowerCase() === 't') return message.channel.send(`> *${li.data.trim()}*`);
                    else if (args[0] && args[0].toLowerCase() !== 't') return syntaxError(message);
                    else return message.channel.send(`> *${li.data.substring(57).trim()}*`);
                })
            .catch(err => 
                {
                    console.error(err);
                    message.channel.send('Ops! *Parece que algo deu errado ao tentar pegar as informações...*');
                });
            message.channel.stopTyping();
        }
        else
        {
            logSlash(interaction);
            
            return axios.get('https://loripsum.net/api/1/medium/plaintext')
            .then(li =>
                {
                    if (args[0] && args[0].toLowerCase() === 't') return `> *${li.data.trim()}*`;
                    else if (args[0] && args[0].toLowerCase() !== 't') return syntaxError;
                    else return `> *${li.data.substring(57).trim()}*`;
                })
            .catch(err => 
                {
                    console.error(err);
                    return 'Ops! *Parece que algo deu errado ao tentar pegar as informações...*';
                });
        }
    },
};