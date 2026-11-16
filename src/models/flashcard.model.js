
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Flashcard = sequelize.define(
    "Flashcard",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flashcardSetId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "Flashcards",
        timestamps: true
    }
);

export default Flashcard;
