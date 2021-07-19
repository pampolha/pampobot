const assinatura = mensagem =>
{
    const regex = />:\)/;
    if (mensagem.content.match(regex))
    {
        return mensagem.react('😈');
    }  
};

module.exports = { assinatura };
