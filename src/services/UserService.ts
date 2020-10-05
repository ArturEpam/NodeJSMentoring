import { UserRepository } from '../data-access/UserRepository';
import { UserDto } from './UserDto';
import { Service } from 'typedi';
import { User, UserCreationAttributes } from '../models';

@Service()
export class UserService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (user) {
            const mappedUser = this.mapToDto(user);
            mappedUser.groups = user.groups.map(group => group.name);

            return mappedUser;
        }

        return null;
    }

    public async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.findAll();
        return users.map(this.mapToDto);
    }

    public async filterAll(loginFilter: string, limit: number): Promise<UserDto[]> {
        const users = await this.userRepository.filterAll(loginFilter, limit);
        return users.map(this.mapToDto);
    }

    public async upsert(user: UserDto) {
        const [updatedUser] = await this.userRepository.upsert(this.mapToUserCreationAttributes(user));
        return this.mapToDto(updatedUser);
    }

    public async deleteById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user)
            return false;

        return await this.userRepository.deleteById(id);
    }

    public async createUser(user: UserDto) {
        const existingUser = await this.userRepository.findById(user.id);
        if (existingUser) {
            return false;
        }
        else {
            const newUser = this.mapToUserCreationAttributes(user);
            const createdUser = await this.userRepository.create(newUser);
            return this.mapToDto(createdUser);
        }
    }

    private mapToDto(user: User): UserDto {
        return {
            id: user.id,
            login: user.login,
            password: user.password,
            age: user.age,
            role: user.role,
            groups: null
        };
    }

    private mapToUserCreationAttributes(user: UserDto): UserCreationAttributes {
        return {
            id: user.id,
            login: user.login,
            password: user.password,
            age: user.age,
            role: user.role,
            isDeleted: false
        }
    }
}