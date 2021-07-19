const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');

const random = require('random');

require('dotenv').config();

const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports =
{
    name: 'sus',
    description: 'Sus...',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message)) return console.log('Comando bloqueado na DM.');

        let color;
        let embedColor;

        switch(random.int(0, 11))
        {
            case 0:
                color = 'Black';
                embedColor = '#3E474E';
                break;
            case 1:
                color = 'Blue';
                embedColor = '#132ED1';
                break;
            case 2:
                color = 'Brown';
                embedColor = '#71491D';
                break;
            case 3:
                color = 'Cyan';
                embedColor = '#39FEDD';
                break;
            case 4:
                color = 'Green';
                embedColor = '#1B913E';
                break;
            case 5:
                color = 'Grey';
                embedColor = '#8397A7';
                break;
            case 6:
                color = 'Orange';
                embedColor = '#F17D0C';
                break;
            case 7:
                color = 'Pink';
                embedColor = '#EC54BB';
                break;
            case 8:
                color = 'Purple';
                embedColor = '#6C2FBC';
                break;
            case 9:
                color = 'Red';
                embedColor = '#C51211';
                break;
            case 10:
                color = 'White';
                embedColor = '#D6DFF1';
                break;
            case 11:
                color = 'Yellow';
                embedColor = '#F6F657';
                break;
        }

        const imagem = new MessageAttachment(process.env.pampobotDir + 'data/sus/sus' + color + '.png', 'sus.png');

        const embed = new MessageEmbed()
        .setColor(embedColor)
        .attachFiles(imagem)
        .setImage('attachment://sus.png');
        
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