
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LearningGoalTask = sequelize.define(
    "LearningGoalTask",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        goalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taskText: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 500]
            }
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: "LearningGoalTasks",
        timestamps: true,
        indexes: [
            {
                fields: ["goalId"]
            }
        ]
    }
);

export default LearningGoalTask;
