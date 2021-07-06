require('dotenv').config();

const axios = require('axios').default;

const Discord = require('discord.js');

const { checkDM } = require('../functions/checkDM');
const { logSlash } = require('../functions/logSlash');

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

        if (!message)
        {
            logSlash(interaction);
            
            return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`)
            .then(apod => 
                {
                    const embed = new Discord.MessageEmbed();

                    embed.setAuthor('Imagem astronômica do dia! 🖖')
                    .setTitle(apod.data.title)
                    .setDescription(apod.data.explanation);
                            
                    if (apod.data.media_type === 'image')
                    {
                        embed.setImage(apod.data.hdurl);
                        if (apod.data.copyright) embed.setFooter(`Foto por: ${apod.data.copyright}`);
                    } 
                    else 
                    {
                        embed.setFooter(`A "imagem" de hoje na verdade é um vídeo! Link: ${apod.data.url}`);
                    }

                    return embed;
                })
            .catch(err => 
            {
                return console.error(err);
            });
        }
        else
        {
            message.channel.startTyping();

            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`)
            .then(apod => 
                {
                    const embed = new Discord.MessageEmbed();

                    embed.setAuthor('Imagem astronômica do dia! 🖖')
                    .setTitle(apod.data.title)
                    .setDescription(apod.data.explanation);
                            
                    if (apod.data.media_type === 'image')
                    {
                        embed.setImage(apod.data.hdurl);
                        if (apod.data.copyright) embed.setFooter(`Foto por: ${apod.data.copyright}`);
                    } 
                    else 
                    {
                        embed.setFooter(`A "imagem" de hoje na verdade é um vídeo! Link: ${apod.data.url}`);
                    }

                    message.channel.stopTyping();

                    return message.channel.send(embed);
                })
            .catch(err => 
            {
                console.error(err);
                return message.channel.send('*Ops! Parece que algo deu errado ao tentar pegar as informações...*');
            });
        }
    },
};