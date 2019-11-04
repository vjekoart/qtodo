// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Services
const DataService = require('./data-service');
const Controllers = require('./controllers');

// Initialization
const _tag = '[index]';

const configuration = {
    serverPort: parseInt(process.env.PORT, 10) || 3000,
    mongo: {
        host: process.env.MONGO_HOST || 'localhost',
        port: parseInt(process.env.MONGO_PORT, 10) || 27017,
        data: process.env.MONGO_DATA || 'qtodo'
    }
}

async function main() {
    try {
        // Set up services
        const dataService = new DataService(configuration.mongo);

        await dataService.init();

        const controllers = new Controllers(dataService);

        // Set up Express
        const app = express();

        app.use(cors());
        app.use(bodyParser());

        app.use('/v1/todo', controllers.getRouter());
        app.get('/v1', (request, response) => response.status(200).json({ status: 'ok' }));

        app.listen(configuration.serverPort, () => {
            console.log(_tag, `main: listening on port ${ configuration.serverPort }`);
        });
    } catch (error) {
        console.error(_tag, 'main: error during initialization:\n-->', error);
    }
}

// Run
main()
