
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("Notes", {
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

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Courses",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Lessons",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
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

    await queryInterface.addIndex("Notes", ["userId", "courseId"]);
    await queryInterface.addIndex("Notes", ["lessonId"]);
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("Notes");
}
