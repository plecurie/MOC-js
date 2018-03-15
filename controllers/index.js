module.exports = server => {
    server.controllers = {
        users: require('./users')(server),
        cars: require('./cars')(server),
        auth: require('./auth')(server),
        trips: require('./trips')(server),
        excelsior: require('./excelsior')(server)
    }
};
