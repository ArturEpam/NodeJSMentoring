import { Controller, Param, Body, Get, Post, Put, Delete, Res, QueryParam, OnUndefined, NotFoundError } from "routing-controllers";
import { User } from '../models';
import { HttpStatusCode } from '../common/';

@Controller()
export class UserController {
    private users = [
        {
            id: 1, login: 'John', password: 'admin', role: 'admin', age: 25, isDeleted: false,
        },
        {
            id: 2, login: 'Jane', password: 'nimda', role: 'moderator', age: 22, isDeleted: false,
        },
        {
            id: 3, login: 'Steven', password: 'dupa123', role: 'user', age: 19, isDeleted: false,
        },
    ];

    private getNotDeletedUsers(): Array<User> {
        return this.users.filter((user) => !user.isDeleted);
    };

    @Get("/users")
    getAll(@Res() response: any) {
        return response.send(this.getNotDeletedUsers());
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number, @Res() response: any) {
        const user = this.getNotDeletedUsers().find((user) => user.id === id);
        if (!user) {
            response.status(HttpStatusCode.NOT_FOUND);
            return response.send("User was not found.");
        }

        return response.send(user);
    }

    @Get("/users/suggest/:nameFilter")
    suggest(@Param("nameFilter") nameFilter: string, @QueryParam("limit") limit: number = 10, @Res() response: any) {
        const filteredUsers = this.getNotDeletedUsers()
            .filter((user) => user.login.toLocaleLowerCase()
                .includes(nameFilter.toLocaleLowerCase()))
            .slice(0, limit);

        return response.send(filteredUsers);
    }

    @Post("/users")
    post(@Body() userToAdd: User, @Res() response: any) {
        const user = this.getNotDeletedUsers().find((user) => user.id === userToAdd.id);
        if (user) {
            response.status(HttpStatusCode.CONFLICT);
            return response.send('User already exists');
        }
        else {
            const newUser = { ...userToAdd, isDeleted: false };
            this.users.push(newUser);
            response.status(HttpStatusCode.CREATED);
            return response.send(newUser);
        }
    }

    @Put("/users/:id")
    put(@Body() user: User, @Res() response: any) {
        const userIndex = this.getNotDeletedUsers().map((user) => user.id).indexOf(user.id);
        if (userIndex < 0) {
            response.status(HttpStatusCode.NOT_FOUND);
            return response.send('User doesnt exist');
        }
        else {
            const updatedUser = { ...user, isDeleted: false };
            this.users[userIndex] = updatedUser;
            return response.send(updatedUser);
        }
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number, @Res() response: any) {
        const userIndex = this.getNotDeletedUsers().findIndex((user) => user.id === id);
        if (userIndex) {
            this.users[userIndex].isDeleted = true;
            response.status(HttpStatusCode.NO_CONTENT);
            response.send('ok');
        } else {
            response.status(HttpStatusCode.NOT_FOUND);
            response.send('User doesnt exist');
        }
    }
}