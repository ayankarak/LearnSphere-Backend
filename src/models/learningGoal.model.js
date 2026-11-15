
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LearningGoal = sequelize.define(
    "LearningGoal",
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
        goalDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        tableName: "LearningGoals",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["userId", "goalDate"],
                name: "unique_user_goal_date"
            }
        ]
    }
);

export default LearningGoal;
