
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LessonProgress = sequelize.define(
  "LessonProgress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "LessonProgress",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "lessonId"],
      },
    ],
  }
);

export default LessonProgress;
