
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.createTable("LessonProgress", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: "Users",
                key: "id"
            },

            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: "Courses",
                key: "id"
            },

            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: "Lessons",
                key: "id"
            },

            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        completedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    await queryInterface.addIndex("LessonProgress", ["userId", "lessonId"], {
        unique: true,
        name: "unique_user_lesson_progress"
    });
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable("LessonProgress");
}
