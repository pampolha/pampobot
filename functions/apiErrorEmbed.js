const { MessageEmbed } = require('discord.js');

const apiErrorEmbed = (err, message = undefined) =>
{
    console.error(err);

    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription('*Ops! Parece que algo deu errado ao tentar pegar as informações...*');

    if (message) return message.channel.send(embed);
    else return embed;
};

module.exports = { apiErrorEmbed };