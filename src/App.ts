import 'reflect-metadata';
import { Express } from 'express';
import { Container } from 'typedi';
import { Sequelize } from 'sequelize';
import { useExpressServer, useContainer } from 'routing-controllers';
import { DbInitializer } from './data-access';

export class App {
  private server: Express;
  private sequelize: Sequelize;
  private isDevEnvironment: boolean;

  constructor(server: Express, sequelize: Sequelize, isDevEnvironment: boolean) {
    this.server = server;
    this.sequelize = sequelize;
    this.isDevEnvironment = isDevEnvironment;
  }

  public initialize(onInitialized: Function): void {
    Container.set('database', this.sequelize);
    useContainer(Container);
    useExpressServer(this.server, {
      controllers: [__dirname + '/controllers/*.js'],
      development: this.isDevEnvironment
    });

    const dbInitializer = Container.get(DbInitializer);
    dbInitializer.initialize().then(() => onInitialized(this.server), (error) => console.log(error));
  }
}
