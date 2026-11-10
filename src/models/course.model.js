
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default Course;
