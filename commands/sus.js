require('dotenv').config();

const { logSlash } = require('../functions/logSlash');
const { checkDM } = require('../functions/checkDM');

const random = require('random');


module.exports =
{
    name: 'sus',
    description: 'Sus...',
    slash: false,
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloqueado na DM.');
        logSlash(interaction);

        let color; 
        switch(random.int(0, 11))
        {
            case 0:
                color = 'Black';
                break;
            case 1:
                color = 'Blue';
                break;
            case 2:
                color = 'Brown';
                break;
            case 3:
                color = 'Cyan';
                break;
            case 4:
                color = 'Green';
                break;
            case 5:
                color = 'Grey';
                break;
            case 6:
                color = 'Orange';
                break;
            case 7:
                color = 'Pink';
                break;
            case 8:
                color = 'Purple';
                break;
            case 9:
                color = 'Red';
                break;
            case 10:
                color = 'White';
                break;
            case 11:
                color = 'Yellow';
                break;
        }

        return message.channel.send({ files: [{ attachment: process.env.pampobotDir + 'data/sus/sus' + color + '.png', name: 'sus.png' }] });
    },
};