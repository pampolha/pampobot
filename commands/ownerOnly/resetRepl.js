const { exec } = require('child_process');

module.exports = {
  name: 'reset',
  slash: false,
  testOnly: false,
  ownerOnly: true,
  callback: (message) => {
    message.react('🆗');
    return exec('kill 1');
  }
}