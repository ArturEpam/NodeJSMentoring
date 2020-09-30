import { Sequelize } from 'sequelize';
import { Inject, Service } from 'typedi';
import { UserGroup, UserGoupAttributes } from '../models';

@Service()
export class UserGroupRepository {
    private sequelize: Sequelize;

    constructor(@Inject('database') sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    public async createAll(userGroups: UserGoupAttributes[]): Promise<UserGroup[]> {
        return await this.sequelize.transaction(async (t) => {
            return await UserGroup.bulkCreate(userGroups);
        });
    }
}