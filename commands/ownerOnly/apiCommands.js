module.exports =
{
    name: 'apicommands',
    aliases: ['api'],
    description: 'Loga os comandos de / salvos na api.',
    slash: false,
    testOnly: false,
    ownerOnly: true,
    callback: async ({ message, args, client }) =>
    {
        if (!args[0])
        {
            const cmd = await client.api.applications(client.user.id).commands.get();
            console.log(cmd);
            return message.react('🆗');
        }
        else if (args[0] === 'remove' || args[0] === 'delete')
        {
            if (args[1])
            {
                try { await client.api.applications(client.user.id).commands(args[1]).delete(); }
                catch { return message.reply('falha. Verifique o ID.'); }
                message.react('🆗');
            }
            else
            {
                return message.reply('informe o ID.');
            }
        }
    },
};