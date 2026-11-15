
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserActivity = sequelize.define(
    "UserActivity",
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

        activityDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        activeSeconds: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["userId", "activityDate"],
                name: "unique_user_daily_activity"
            }
        ]
    }
);

export default UserActivity;
