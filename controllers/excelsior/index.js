module.exports = server => {
    return {
        command: require('./command')(server)
    };
};
