module.exports =
{
    name: 'statusurl',
    aliases: ['su'],
    description: 'Troca a url do status exibido pelo bot.',
    slash: false,
    testOnly: false,
    ownerOnly: true,
    callback: ({ text, client }) =>
    {
        if (!text) return;
        else if (text === 'default') return client.user.setPresence({ status: 'online', activity: { name: client.user.presence.activities[0].name, type: 'STREAMING', url: null } });
        else return client.user.setPresence({ status: 'online', activity: { name: client.user.presence.activities[0].name, type: 'STREAMING', url: text } });
    },
};