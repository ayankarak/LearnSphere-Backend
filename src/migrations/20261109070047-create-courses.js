
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("Courses", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        instructor: {
            type: DataTypes.STRING(255),
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
    await queryInterface.dropTable("Courses");
}

