import { Sequelize } from "sequelize";
import { Inject, Service } from "typedi";
import { User, UserCreationAttributes } from "../models/User";

@Service()
export class UserRepository {
    constructor(@Inject('connection') sequelize: Sequelize) {
        User.initialize(sequelize);
    }

    public async findById(id: number): Promise<User> {
        return await User.findByPk(id);
    }

    public async isEmpty(): Promise<boolean> {
        return await User.count() == 0;
    }

    public async createAll(users: UserCreationAttributes[]): Promise<User[]> {
        return await User.bulkCreate(users);
    }
}