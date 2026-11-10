
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("Lessons", {
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

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        videoUrl: {
            type: DataTypes.STRING(500),
            allowNull: true
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        isPreview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
    await queryInterface.dropTable("Lessons");
}
