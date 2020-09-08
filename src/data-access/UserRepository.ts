import { Sequelize } from 'sequelize';
import { Inject, Service } from 'typedi';
import { User, UserCreationAttributes, UserAttributes } from '../models/User';
import { WhereOptions } from 'sequelize';

@Service()
export class UserRepository {
    private notDeleted: WhereOptions<UserAttributes> = { isDeleted: false };
    private sequelize: Sequelize;

    constructor(@Inject('database') sequelize: Sequelize) {
        User.initialize(sequelize);
        this.sequelize = sequelize;
    }

    public async findById(id: number): Promise<User> {
        return await User.findOne({ where: { ...this.notDeleted, id } });
    }

    public async findAll(): Promise<User[]> {
        return await User.findAll({ where: this.notDeleted });
    }

    public async filterAll(loginFilter: string, limit: number): Promise<User[]> {
        return await this.sequelize.query(`select * from users where lower(login) like '%${loginFilter.toLocaleLowerCase()}%' limit ${limit}`, {
            model: User,
            mapToModel: true
        });
    }

    public async upsert(user: UserCreationAttributes): Promise<[User, boolean]> {
        return await User.upsert(user);
    }

    public async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }

    public async deleteById(id: number) {
        return await User.update({ isDeleted: true }, { where: { ...this.notDeleted, id } });
    }

    public async isEmpty(): Promise<boolean> {
        return await User.count() == 0;
    }

    public async createAll(users: UserCreationAttributes[]): Promise<User[]> {
        return await User.bulkCreate(users);
    }
}