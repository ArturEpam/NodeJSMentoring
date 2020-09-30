import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Res, QueryParam, NotFoundError, HttpCode, HttpError } from 'routing-controllers';
import { UserDto, UserService } from '../services';
import { HttpStatusCode } from '../common';

@JsonController('/users')
export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    @Get('/')
    async getAll() {
        return await this.userService.findAll();
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (!user)
            throw new NotFoundError(`User was not found.`);

        return user;
    }

    @Get('/suggest/:loginFilter')
    async suggest(@Param('loginFilter') loginFilter: string, @QueryParam('limit') limit: number = 10) {
        return await this.userService.filterAll(loginFilter, limit);
    }

    @HttpCode(HttpStatusCode.CREATED)
    @Post('/')
    async post(@Body() userToAdd: UserDto) {
        const createdUser = await this.userService.createUser(userToAdd);
        if (!createdUser)
            throw new HttpError(HttpStatusCode.CONFLICT, 'User already exists.');

        return createdUser;
    }

    @Put('/')
    async put(@Body({ required: true }) user: UserDto) {
        const updatedUser = await this.userService.upsert(user);

        if (!updatedUser)
            throw new NotFoundError('User was not found.');

        return updatedUser;
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteById(id);

        if (!deletedUser)
            throw new NotFoundError('User was not found.');

        return null;
    }
}