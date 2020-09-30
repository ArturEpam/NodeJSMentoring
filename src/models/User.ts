import { HasManyGetAssociationsMixin } from 'sequelize';
import {
    Sequelize,
    Model,
    Optional,
    DataTypes
} from 'sequelize';
import { Group } from './Group';

export interface UserAttributes {
    id: string;
    login: string;
    password: string;
    role: string;
    age: number;
    isDeleted: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: string;
    public login!: string;
    public password!: string;
    public role!: string;
    public age!: number;
    public isDeleted!: boolean;

    public getGroups!: HasManyGetAssociationsMixin<Group>;
    public readonly groups?: Group[];

    public static initialize(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV1,
                    primaryKey: true
                },
                login: {
                    type: new DataTypes.STRING(32),
                    allowNull: false,
                },
                password: {
                    type: new DataTypes.STRING(32),
                    allowNull: false,
                },
                role: {
                    type: new DataTypes.STRING(32),
                    allowNull: false,
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                isDeleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                }
            },
            {
                tableName: 'users',
                sequelize
            }
        );        
    }
}