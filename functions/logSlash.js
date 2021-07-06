require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const logSlash = (interaction) =>
{
    if (!interaction) return;
    
    client.guilds.fetch(interaction.guild_id, true)
    .then(guild => 
        {
            console.log(`${interaction.member.user.username} usou: "/${interaction.data.name}" no servidor "${guild.name}"`);
        });
};

module.exports = { logSlash };