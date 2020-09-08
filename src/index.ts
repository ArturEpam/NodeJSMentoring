import * as express from 'express';
import { App } from './App';
import { Sequelize } from 'sequelize';

const APPLICATION_PORT = 8080;

const app = new App(express(), new Sequelize("postgres://postgres:Odpi3rd@laj123@localhost:5432/mydb"));
app.initialize((server) => server.listen(APPLICATION_PORT, () => {
    console.log(`App running on localhost:${APPLICATION_PORT}`);
}));