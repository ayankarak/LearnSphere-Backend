
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("LearningGoals", {
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

        goalDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        targetLessons: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        "LearningGoals",
        ["userId", "goalDate"],
        {
            unique: true,
            name: "unique_user_goal_date"
        }
    );
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("LearningGoals");
}
