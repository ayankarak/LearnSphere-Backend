
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("UserActivities", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        activityDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        activeSeconds: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    await queryInterface.addIndex(
        "UserActivities",
        ["userId", "activityDate"],
        {
            unique: true,
            name: "unique_user_daily_activity"
        }
    );
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("UserActivities");
}
