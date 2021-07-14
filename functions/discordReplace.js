const discordReplace = text => text.replace(/\|\||~~|[*`]|^> /gim, '\u200B');

module.exports = { discordReplace };