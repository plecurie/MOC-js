module.exports = server => {
    require('./users')(server);
    require('./cars')(server);
    require('./auth')(server);
    require('./trips')(server);
    require('./excelsior')(server);
};
