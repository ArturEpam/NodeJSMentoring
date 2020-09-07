import "reflect-metadata";
import { UserController } from './controllers';
import { useExpressServer } from "routing-controllers";

export class App {  
  public mountRoutes(app : any): void {
    useExpressServer(app, {
      controllers: [UserController],
      defaultErrorHandler: true
    });
  }
}
