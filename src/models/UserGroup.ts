import {
    Sequelize,
    Model,
    DataTypes,
    Optional
} from 'sequelize';

export interface UserGoupAttributes {
    id: number;
}

export interface UserGroupCreationAttributes extends Optional<UserGoupAttributes, 'id'> { }

export class UserGroup extends Model<UserGoupAttributes, UserGroupCreationAttributes>
    implements UserGoupAttributes {
    public id!: number;

    public static initialize(sequelize: Sequelize) {
        UserGroup.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrementIdentity: true,
                    primaryKey: true
                }
            },
            {
                tableName: 'usergroups',
                sequelize
            }
        );
    }
}