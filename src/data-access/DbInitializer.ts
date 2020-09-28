import { Service } from "typedi";
import { UserRepository } from "./UserRepository";
import { UserCreationAttributes, User } from "../models";

@Service()
export class DbInitializer {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async initialize() {
        await this.initializeUsers();
    }

    private async initializeUsers() {
        await User.sync();
        const hasRecords: boolean = await this.userRepository.isEmpty();

        if (hasRecords) {
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
}