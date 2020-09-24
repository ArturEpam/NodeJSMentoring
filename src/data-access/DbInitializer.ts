import { Service } from "typedi";
import { UserRepository } from "./UserRepository";
import { UserCreationAttributes, User, GroupCreationAttributes, Permission, Group } from "../models";
import { GroupRepository } from "./GroupRepository";

@Service()
export class DbInitializer {
    private userRepository: UserRepository;
    private groupRepository: GroupRepository;

    constructor(userRepository: UserRepository, groupRepository: GroupRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public async initialize() {
        await this.initializeUsers();
        await this.initializGroups();
    }

    private async initializeUsers() {
        await User.sync();        
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

    private async initializGroups() {
        await Group.sync();
        if (this.groupRepository.isEmpty()) {
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

            // add UserGroup  with on delete cascade
        }
    }
}