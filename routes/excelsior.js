const router = require('express').Router();

module.exports = server => {
    router
        .post('/command',
            server.middlewares.bodyParser.json(),
            server.controllers.excelsior.command
        );

    server.use('/', router);
};
