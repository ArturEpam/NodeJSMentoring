import {
    Sequelize,
    Model,
    Optional,
    DataTypes,
} from 'sequelize';

export enum Permission {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE",
    SHARE = "SHARE",
    UPLOAD_FILES = "UPLOAD_FILES"
}

export interface GroupAttributes {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> { }

export class Group extends Model<GroupAttributes, GroupCreationAttributes>
    implements GroupAttributes {
    public id!: string;
    public name!: string;
    public permissions!: Array<Permission>;

    public static initialize(sequelize: Sequelize) {
        Group.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV1,
                    primaryKey: true
                },
                name: {
                    type: new DataTypes.STRING(32),
                    allowNull: false,
                },
                permissions: {
                    type: new DataTypes.ARRAY(DataTypes.STRING),
                    allowNull: false                    
                }
            },
            {
                tableName: 'groups',
                sequelize
            }
        );
    }
}