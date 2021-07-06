require('dotenv').config();

const checkDM = (message = undefined, interaction = undefined) =>
{
    if (message && message.channel.type === 'dm') return true;
    else if (interaction && interaction.member === undefined) return true;
};

module.exports = { checkDM };