const { distube } = require('../distube/distubeClient');
const { connectionErrorEmbed } = require('../errors/connectionErrorEmbed');
const { isTrackOrPlaylist, validateURL, trackGet, playListGet } = require('spotify-to-yt');
const { getPreview } = require('spotify-url-info');

async function playSpotify(message, text) {
    if (await validateURL(text) === false) {
        return connectionErrorEmbed('linkInvalido', message);
    }
    message.react('🆗');

    if (await isTrackOrPlaylist(text) == 'track') {
        const track = await trackGet(text).then(gotTrack => gotTrack.url)
        .catch(err => connectionErrorEmbed(err, message));
        return distube.play(message, track)
        .catch(err => connectionErrorEmbed(err, message));
    }
    else {
        const playlistName = await getPreview(text).then(preview => preview.title)
        .catch(err => connectionErrorEmbed(err, message));
        const playlist = await playListGet(text).then(gotPlaylist => gotPlaylist.songs)
        .catch(err => connectionErrorEmbed(err, message));
        return distube.playCustomPlaylist(message, playlist, { name: playlistName })
        .catch(err => connectionErrorEmbed(err, message));
    }            
} 

module.exports = { playSpotify };