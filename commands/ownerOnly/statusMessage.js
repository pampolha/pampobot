module.exports =
{
    name: 'statusmessage',
    aliases: ['sm'],
    description: 'Troca a mensagem do status exibido pelo bot.',
    slash: false,
    testOnly: false,
    ownerOnly: true,
    callback: ({ text, client }) =>
    {
        if (!text) return;
        else if (text === 'default') return client.user.setPresence({ status: 'online', activity: { name: '>help 🤖 || Não recebo mensagens no privado >:)', type: client.user.presence.activities[0].type } });
        else return client.user.setPresence({ status: 'online', activity: { name: text, type: 'PLAYING' } });
    },
};