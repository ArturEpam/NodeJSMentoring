import * as express from 'express';
import { Sequelize } from 'sequelize';
import { App } from './App';
import { Configuration } from './configuration';

const configuration = Configuration.getConfiguration();
const applicationPort = configuration.getApplicationPort();

const app = new App(express(), new Sequelize(configuration.getConnectionString()), configuration.isDevEnvironment());
app.initialize((server) => server.listen(applicationPort, () => {
    console.log(`App running on localhost:${applicationPort}`);
}));