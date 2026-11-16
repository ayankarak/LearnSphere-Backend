
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("DiscussionPosts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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

        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "DiscussionPosts",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
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
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("DiscussionPosts");
}
