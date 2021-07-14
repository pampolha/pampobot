const musica = 
[[{ name: 'Play:', value: 'Pesquise uma música no youtube e selecione o resultado usando: `>play | >p <link ou texto para pesquisar>`.', inline: false },
{ name: 'Play first:', value: 'Toque a primeira música encontrada com a pesquisa usando: `>playfirst | >playf | >pf <link ou texto para pesquisar>`.', inline: false },
{ name: 'Queue:', value: 'Veja a fila de músicas atual usando: `>queue | >fila | >q`.', inline: false },
{ name: 'Volume:', value: 'Ajuste o volume das músicas da queue usando: `>volume | >vl <número de 0 a 100>`.\n' +
'Para ver o volume atual, use apenas `>volume`.', inline: false }],

[{ name: 'Skip:', value: 'Pule a música atual da queue usando: `skip | >sk`.', inline: false },
{ name: 'Stop:', value: 'Termine a execução das músicas e limpe a queue usando: `>stop | >exit`.', inline: false },
{ name: 'Filter:', value: 'Aplique um filtro de áudio à queue atual usando: `>filter | >fil <nome do filtro>`.\n' +
'Para ver o filtro atual e os disponíveis, use apenas `>filter`.', inline: false },
{ name: 'Clear:', value: 'Limpe todas as músicas da queue, deixando apenas a música atual usando: `>clear | >cl`.', inline: false }]];

module.exports = { musica };