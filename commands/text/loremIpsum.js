const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');
const { connectionErrorEmbed } = require('../../functions/errors/connectionErrorEmbed');


const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

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

        else logSlash(interaction);

        const embed = new MessageEmbed().setColor('BLUE');
        
        return axios.get('https://loripsum.net/api/1/medium/plaintext')
        .then(li =>
        {
            let texto;

            if (args[0] && args[0].toLowerCase() === 'li') texto = `*${li.data.trim()}*`;
            else texto = `*${li.data.substring(57).trim()}*`;

            embed.setDescription(texto);

            if (message)
            {
                return message.channel.send(embed);
            }
            else
            {
                return embed;
            }
        })
        .catch(err => 
        {
            return connectionErrorEmbed(err, message);
        });
    },
};