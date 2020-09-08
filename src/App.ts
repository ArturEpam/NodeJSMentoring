import "reflect-metadata";
import { Express } from 'express';
import { Container } from "typedi";
import { Sequelize } from "sequelize";
import { useExpressServer, useContainer } from "routing-controllers";
import { DbInitializer } from "./data-access/DbInitializer";

export class App {
  private server: Express;
  private sequelize: Sequelize;

  constructor(server: Express, sequelize: Sequelize) {
    this.server = server;
    this.sequelize = sequelize;
  }

  public initialize(onInitialized: Function): void {
    Container.set('connection', this.sequelize);
    useContainer(Container);
    useExpressServer(this.server, {
      controllers: [__dirname + "/controllers/*.js"]      
    });

    const dbInitializer = Container.get(DbInitializer);
    dbInitializer.initialize().then(() => onInitialized(this.server), (error) => console.log(error));    
  }
}
