import * as express from 'express';
import { App } from './App';

const server = express();
const app = new App();
app.mountRoutes(server);

const APPLICATION_PORT = 8080;

server.listen(APPLICATION_PORT, () => {  
  console.log(`App running on localhost:${APPLICATION_PORT}`);
});