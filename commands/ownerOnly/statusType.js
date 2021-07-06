module.exports =
{
    name: 'statustype',
    aliases: ['st'],
    description: 'Troca o tipo da atividade do status exibido pelo bot.',
    slash: false,
    testOnly: false,
    ownerOnly: true,
    callback: ({ message, text, client }) =>
    {
        let type;
        if (!text) 
        {
            return message.reply('0..4 => PLAYING, STREAMING, LISTENING, WATCHING, COMPETING');
        }
        else
        {
            switch (text)
            {
                default:
                case '0':
                    type = 'PLAYING';
                    break;
                case '1':
                    type = 'STREAMING';
                    break;
                case '2':
                    type = 'LISTENING';
                    break;
                case '3':
                    type = 'WATCHING';
                    break;
                case '4':
                    type = 'COMPETING';
                    break;
            }
        }

        if (text === 'default') return client.user.setPresence({ status: 'online', activity: { name: client.user.presence.activities[0].name, type: 'PLAYING' } });
        else return client.user.setPresence({ status: 'online', activity: { name: client.user.presence.activities[0].name, type: type } });
    },
};