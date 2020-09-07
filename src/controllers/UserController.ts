import { HttpStatusCode } from '../common';
import { Router, Request, Response } from 'express';
import { User } from '../models';
const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    const  getNotDeletedUsers = function() : Array<User> {
        return users.filter((user) => !user.isDeleted);
    };

    route.get('/:id', (req: Request, res: Response) => {
        const user = getNotDeletedUsers().find((user) => user.id === parseInt(req.params.id));
        if (user) { res.json(user); } else { res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found' }); }
    });
};

// export const getProjects = (req: Request, res: Response) => {
//     const user = getNotDeletedUsers().find((user) => user.id === req.params.id);

//     if (user) { res.json(user); } else { res.status(NOT_FOUND).json({ message: 'User not found' }); }
// }
// };

// function getNotDeletedUsers() {
//     return users.filter((user) => !user.isDeleted);
// };