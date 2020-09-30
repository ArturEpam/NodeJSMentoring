import 'reflect-metadata';
import { JsonController, Param, Body, Post, HttpCode } from 'routing-controllers';
import { UserGroupService } from '../services';
import { HttpStatusCode } from '../common';

@JsonController('/usergroups')
export class UserController {
    private userGroupService: UserGroupService;

    constructor(userGroupService: UserGroupService) {
        this.userGroupService = userGroupService;
    }
   
    @HttpCode(HttpStatusCode.CREATED)
    @Post('/:id')
    async post(@Param('id') groupId : string, @Body() users: string[]) {
        return await this.userGroupService.addUsersToGroup(groupId, users);    
    }
}