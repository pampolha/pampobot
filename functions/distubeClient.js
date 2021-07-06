    require('dotenv').config();

    const { distubeEvents } = require('./distubeEvents');

    const Discord = require('discord.js');
    const client = new Discord.Client();
    client.login(process.env.BOT_TOKEN);

    const DisTube = require('distube');

    const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true }).setMaxListeners(1);

    distubeEvents(distube);

    process.on('warning', e => console.warn(e.stack));

    module.exports = { distube };