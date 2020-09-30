import { UserGroupRepository } from '../data-access';
import { Service } from 'typedi';
import { UserGroup, UserGoupAttributes } from '../models';
import { UserGroupDto } from './UserGroupDto';

@Service()
export class UserGroupService {
    private userGroupRepository: UserGroupRepository;
    constructor(userGroupRepository: UserGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    public async addUsersToGroup(groupId: string, userIds: string[]): Promise<UserGroupDto[]> {
        const userGroupsToCreate = userIds.map(userId => this.mapToUserCreationAttributes(groupId, userId));
        const userGroupsCreated = await this.userGroupRepository.createAll(userGroupsToCreate);

        return userGroupsCreated.map(userGroup => this.mapToUserGroupDto(userGroup));
    }

    private mapToUserGroupDto(userGroup: UserGroup): UserGroupDto {
        return {        
            userId: userGroup.userId,
            groupId: userGroup.groupId
        }
    }

    private mapToUserCreationAttributes(groupId: string, userId: string): UserGoupAttributes {
        return {
            groupId,
            userId
        }
    }
}