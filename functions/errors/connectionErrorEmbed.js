const { MessageEmbed } = require('discord.js');
const { isContainerMinigetError } = require('./isContainerMinigetError');
const { exec } = require('child_process');

const connectionErrorEmbed = (err, message = undefined) =>
{
    if (isContainerMinigetError(err))
    {
      const embed = new MessageEmbed()
      .setColor('RED')
      .setDescription('*Ops! Parece que algo deu errado ao tentar pegar as informações...*' + '\n' + '*Eu irei reiniciar para que isso seja resolvido. Volto logo!*');

      if (message) message.channel.send(embed);
      else embed;

      return exec('kill 1');
    }

    console.error(err);

    const embed = new MessageEmbed()
    .setColor('RED')
    .setDescription('*Ops! Parece que algo deu errado ao tentar pegar as informações...*');

    if (message) return message.channel.send(embed);
    else return embed;
};

module.exports = { connectionErrorEmbed };