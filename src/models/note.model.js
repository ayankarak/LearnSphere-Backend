
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Note = sequelize.define(
    "Note",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["userId", "lessonId"],
                name: "unique_user_lesson_note"
            }
        ]
    }
);

export default Note;
