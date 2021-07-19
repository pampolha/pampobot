require('dotenv').config();

const axios = require('axios').default;

const { MessageEmbed } = require('discord.js');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');
const { connectionErrorEmbed } = require('../../functions/errors/connectionErrorEmbed');

module.exports =
{
    name: 'apod',
    aliases: ['nasa'],
    description: 'Receba a imagem astronômica do dia providenciada pela NASA!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');

        else logSlash(interaction);

        return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`)
        .then(apod => 
        {
            const embed = new MessageEmbed()
            .setAuthor('Imagem astronômica do dia! 🖖')
            .setTitle(apod.data.title)
            .setDescription(apod.data.explanation)
            .setColor('BLUE');
                    
            if (apod.data.media_type === 'image')
            {
                embed.setImage(apod.data.hdurl);
                if (apod.data.copyright) embed.setFooter(`Foto por: ${apod.data.copyright}`);
            } 
            else 
            {
                embed.addField('A "imagem" de hoje na verdade é um vídeo!', `Link: ${apod.data.url}`);
                if (apod.data.copyright) embed.setFooter(`Vídeo por: ${apod.data.copyright}`);
            }

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