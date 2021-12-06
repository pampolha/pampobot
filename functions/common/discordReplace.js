const discordReplace = text => {
    text += '';
    return text.replace(/\|\||~~|[*`]|^> /gim, '\u200B');
};
module.exports = { discordReplace };