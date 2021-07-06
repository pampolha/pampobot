module.exports =
{
    name: 'interactionlog',
    aliases: ['il'],
    description: 'Loga para o console o objeto interaction do WOK command handler.',
    slash: true,
    testOnly: true,
    ownerOnly: true,
    callback: ({ interaction }) =>
    {
        return '>:)', console.log(interaction);
    },
};