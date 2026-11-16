
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FlashcardSet = sequelize.define(
    "FlashcardSet",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        generatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "FlashcardSets",
        timestamps: true
    }
);

export default FlashcardSet;
