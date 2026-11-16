
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DiscussionPost = sequelize.define(
    "DiscussionPost",
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

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "DiscussionPosts",
        timestamps: true
    }
);

export default DiscussionPost;
