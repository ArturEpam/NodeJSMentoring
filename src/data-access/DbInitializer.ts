import { Inject, Service } from "typedi";
import { UserRepository } from "./UserRepository";
import { GroupRepository } from "./GroupRepository";
import { UserCreationAttributes, User, GroupCreationAttributes, Permission, Group, UserGroup } from "../models";
import { Sequelize } from "sequelize";

@Service()
export class DbInitializer {
    private userRepository: UserRepository;
    private groupRepository: GroupRepository;
    private sequelize: Sequelize;

    constructor(userRepository: UserRepository, groupRepository: GroupRepository, @Inject('database') sequelize: Sequelize) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.sequelize = sequelize;
    }

    public async initialize() {
        await this.initializeSchema();
        await this.initializeData();
    }

    private async initializeSchema() {
        this.initializeTables();
        this.initiaLizeAssociations();
        await this.sequelize.sync();
    }

    private initializeTables() {
        User.initialize(this.sequelize);
        UserGroup.initialize(this.sequelize);
    }

    private initiaLizeAssociations() {
        UserGroup.belongsTo(User, { foreignKey: 'userId' });
        UserGroup.belongsTo(Group, { foreignKey: 'groupId' });
        User.belongsToMany(Group, { as: 'groups', through: 'usergroups', foreignKey: 'userId' });
    };

    private async initializeData() {
        await this.initializeUsersData();
        await this.initializGroupsData();
    }

    private async initializeUsersData() {
        if (await this.userRepository.isEmpty()) {
            const defaultUsers: UserCreationAttributes[] = [
                {
                    login: 'John', password: 'admin', role: 'admin', age: 25, isDeleted: false,
                },
                {
                    login: 'Jane', password: 'nimda', role: 'moderator', age: 22, isDeleted: false,
                },
                {
                    login: 'Steven', password: 'dupa123', role: 'user', age: 19, isDeleted: false,
                },
            ];
            await this.userRepository.createAll(defaultUsers);
        }
    }

    private async initializGroupsData() {
        if (await this.groupRepository.isEmpty()) {
            const defaultGroups: GroupCreationAttributes[] = [
                {
                    name: 'Reader', permissions: [Permission.READ]
                },
                {
                    name: 'Writer', permissions: [Permission.DELETE, Permission.WRITE],
                },
                {
                    name: 'Owner', permissions: [Permission.DELETE, Permission.WRITE, Permission.SHARE, Permission.UPLOAD_FILES],
                },
            ];
            await this.groupRepository.createAll(defaultGroups);
        }
    }
}