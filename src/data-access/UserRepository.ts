import { Sequelize } from 'sequelize';
import { Inject, Service } from 'typedi';
import { User, UserCreationAttributes, UserAttributes } from '../models/User';
import { WhereOptions } from 'sequelize';

@Service()
export class UserRepository {
    private notDeleted: WhereOptions<UserAttributes> = { isDeleted: false };
    private sequelize: Sequelize;

    constructor(@Inject('database') sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    public async findById(id: string): Promise<User> {
        return User.findOne({ where: { ...this.notDeleted, id }, include: 'groups' });
    }

    public async findAll(): Promise<User[]> {
        return User.findAll({ where: this.notDeleted });
    }

    public async filterAll(loginFilter: string, limit: number): Promise<User[]> {
        return this.sequelize.query(`select * from users where lower(login) like '%${loginFilter.toLocaleLowerCase()}%' limit ${limit}`, {
            model: User,
            mapToModel: true
        });
    }

    public async upsert(user: UserCreationAttributes): Promise<[User, boolean]> {
        return User.upsert(user);
    }

    public async create(user: UserCreationAttributes): Promise<User> {
        return User.create(user);
    }

    public async deleteById(id: string) {
        return User.update({ isDeleted: true }, { where: { ...this.notDeleted, id } });
    }

    public async isEmpty(): Promise<boolean> {
        return await User.count() == 0;
    }

    public async createAll(users: UserCreationAttributes[]): Promise<User[]> {
        return User.bulkCreate(users);
    }
}