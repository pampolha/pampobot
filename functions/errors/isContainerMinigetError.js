const isContainerMinigetError = (err) =>
{
    const errString = err.toString().toLowercase();

    if (errString.contains('miniget error') && errString.contains('4')) return true;
    else return false;
};

module.exports = { isContainerMinigetError };