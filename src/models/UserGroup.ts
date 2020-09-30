import {
    Sequelize,
    Model,
    DataTypes,
    Optional
} from 'sequelize';

export interface UserGoupAttributes {
    groupId: string,
    userId: string
}

export class UserGroup extends Model<UserGoupAttributes>
    implements UserGoupAttributes {
    public groupId!: string;
    public userId!: string;

    public static initialize(sequelize: Sequelize) {
        UserGroup.init(
            {
                groupId: {
                    type: DataTypes.UUID,
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.UUID,
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