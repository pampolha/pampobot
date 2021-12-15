const { User, MessageEmbed } = require('discord.js');
const { client } = require('../../index');

const connectionErrorEmbed = (err, message = undefined) =>
{
    console.error(err);

    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription('*Ops! Parece que algo deu errado ao tentar pegar as informações...*');

    if (err.toString().toLowercase().contains('miniget error'))
    {
      new User(client, { id: process.env.meuID }).send('erro: ' + err.toString());
    }

    if (message) return message.channel.send(embed);
    else return embed;
};

module.exports = { connectionErrorEmbed };