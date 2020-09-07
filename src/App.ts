import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as Joi from '@hapi/joi';
// import { createValidator } from 'express-joi-validation';
// import {
//   CREATED, CONFLICT, NO_CONTENT, NOT_FOUND,
// } from './common/HttpStatusCode';
import "reflect-metadata";
import { UserController } from './controllers';

class App {
  public app;

  constructor() {
    this.app = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    UserController(this.app);
  }
}

export default new App().app;


// const validator = createValidator({});

// app.use(bodyParser.json());



// const userSchema = Joi.object({
//   id: Joi.number().integer().required(),
//   login: Joi.string().required(),
//   password: Joi.string().alphanum().required(),
//   age: Joi.number().min(4).max(130).required(),
//   role: Joi.string().required(),
// });

// function getNotDeletedUsers() {
//   return users.filter((user) => !user.isDeleted);
// }

// app.get('/users', (req, res) => {
//   res.json(getNotDeletedUsers());
// });

// app.post('/users', validator.body(userSchema), (req, res) => {
//   const user = getNotDeletedUsers().find((user) => user.id === req.body.id);
//   if (user) {
//     res.status(CONFLICT).json('User already exists');
//     return;
//   }

//   const newUser = { ...req.body, isDeleted: false };
//   users.push(newUser);
//   res.status(CREATED).json(newUser);
// });

// app.put('/users', validator.body(userSchema), (req, res) => {
//   const userIndex = getNotDeletedUsers().map((user) => user.id).indexOf(req.body.id);
//   if (userIndex < 0) {
//     res.status(NOT_FOUND).json('User doesnt exist');
//     return;
//   }

//   const newUser = { ...req.body, isDeleted: false };
//   users[userIndex] = newUser;
//   res.json(newUser);
// });

// app.delete('/users/:id', (req, res) => {
//   const user = getNotDeletedUsers().find((user) => user.id === req.params.id);
//   if (user) {
//     const userIndex = users.indexOf(user);
//     users[userIndex].isDeleted = true;
//     res.status(NO_CONTENT).json('ok');
//   } else {
//     res.status(NOT_FOUND).json('User doesnt exist');
//   }
// });

// app.get('/users/suggest/:nameFilter', (req, res) => {
//   const defaultLimit = 10;
//   let limit = defaultLimit;
//   if (req.query.limit) {
//     limit = req.query.limit;
//   }

//   const filteredUsers = getNotDeletedUsers()
//     .filter((user) => user.login.toLocaleLowerCase()
//       .includes(req.params.nameFilter.toLocaleLowerCase()))
//     .slice(0, limit);
//   res.json(filteredUsers);
// });
