const { getTracks, getPreview } = require('spotify-url-info');
const { distube } = require('../distube/distubeClient');
const { connectionErrorEmbed } = require('../errors/connectionErrorEmbed');

function playSpotify(message, text) {
    const nome = new Array;
    const artista = new Array;
    let playlistName = new String;

    getPreview(text).then(preview => playlistName = preview.title);

    getTracks(text).then(data => {
        data.forEach(track => {
            artista.push(track.artists[0].name);
            nome.push(track.name);
        });

        message.react('🆗');
        
        if (nome.length > 1) {
            const playlist = new Array;

            for (let i = 0; i < nome.length; i++) {
                distube.search(nome[i] + ' ' + artista[i])
                .then(result => {
                    result = result.filter(element => element.formattedDuration);
                    playlist.push(result[0].url);
                
                    if (i === nome.length - 1) {
                        try {
                            return distube.playCustomPlaylist(message, playlist, { name: playlistName });
                        } catch (err) {
                            return connectionErrorEmbed(err, message);
                        }
                    }
                });
            }
        }
        else {
            try {
                return distube.play(message, nome[0] + ' ' + artista[0]);
            }
            catch(err) {
                return connectionErrorEmbed(err, message);
            }
        }
    })
    .catch(err => {
        return connectionErrorEmbed(err, message);
    });
}

module.exports = { playSpotify };