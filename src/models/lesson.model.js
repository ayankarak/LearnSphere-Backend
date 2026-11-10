
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Lesson = sequelize.define(
    "Lesson",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        }
    },
    {
        tableName: "Lessons",
        timestamps: true
    }
);

export default Lesson;
