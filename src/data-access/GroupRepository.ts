import { Sequelize } from 'sequelize';
import { Inject, Service } from 'typedi';
import { Group, GroupCreationAttributes } from '../models';

@Service()
export class GroupRepository {
    private sequelize: Sequelize;

    constructor(@Inject('database') sequelize: Sequelize) {
        Group.initialize(sequelize);
    }

    public async isEmpty(): Promise<boolean> {
        return await Group.count() == 0;
    }

    public async createAll(groups: GroupCreationAttributes[]): Promise<Group[]> {
        return await Group.bulkCreate(groups);
    }
}