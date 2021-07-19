require('dotenv').config();

const axios = require('axios').default;

const random = require('random');

const { MessageEmbed } = require('discord.js');

const { checkDM } = require('../../functions/common/checkDM');
const { logSlash } = require('../../functions/common/logSlash');
const { connectionErrorEmbed } = require('../../functions/errors/connectionErrorEmbed');

module.exports =
{
    name: 'escolherjogo',
    aliases: ['escolher', 'jogo', 'steam'],
    description: 'Vou escolher um jogo da sua biblioteca steam para você jogar!',
    slash: 'both',
    expectedArgs: '<steam_id>', 
    testOnly: false,
    callback: ({ message, interaction, args }) =>
    {
        if (checkDM(message, interaction)) return console.log('Comando bloquado na DM.');
        logSlash(interaction);

        const embed = new MessageEmbed();

        if (!args[0])
        {
            embed
            .setColor('RED')
            .setDescription('Você precisa especificar um ID da Steam para usar esse comando.');

            if (message) return message.channel.send(embed);
            else return embed;
        }
        else
        {            
            const steamId = args[0];

            return axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&format=json&include_appinfo=true&`)
            .then(games => 
            {
                return axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${steamId}`)
                .then(user =>
                {
                    const steamUser = user.data.response.players[0];
                    const visibleNum = steamUser.communityvisibilitystate;

                    const isVisible = visibleNum === 3 ? true : false;

                    if (!isVisible)
                    {
                        embed
                        .setColor('RED')
                        .setDescription(`O perfil "${steamUser.personaname}" não é um perfil público na Steam!`);
                    }
                    else
                    {
                        const jogos = games.data.response.games;
                        const jogoEscolhido = jogos[random.int(0, jogos.length - 1)];
                        
                        embed
                        .setColor('BLUE')
                        .setThumbnail(steamUser.avatar)
                        .setTitle(`O usuário da steam "${steamUser.personaname}" tem ${jogos.length} jogos na biblioteca!`)
                        .setDescription(`Eu sugiro que ele jogue: **${jogoEscolhido.name}**`)
                        .setImage(`http://media.steampowered.com/steamcommunity/public/images/apps/${jogoEscolhido.appid}/${jogoEscolhido.img_logo_url}.jpg`);
                    }

                    if (message)
                    {
                        return message.channel.send(embed);
                    }
                    else 
                    {
                        return embed;
                    }
                })
                .catch(err =>
                {
                    return connectionErrorEmbed(err, message);
                });
            })
            .catch(() => 
            {
                embed
                .setColor('RED')
                .setDescription('Steam ID inválido!');

                if (message) return message.channel.send(embed);
                else return embed;
            });
        }
    },
};