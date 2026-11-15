
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.changeColumn("Notes", "lessonId", {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Lessons",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    });

    await queryInterface.addIndex(
        "Notes",
        ["userId", "lessonId"],
        {
            unique: true,
            name: "unique_user_lesson_note"
        }
    );
}

export async function down({ context: queryInterface }) {
    await queryInterface.removeIndex(
        "Notes",
        "unique_user_lesson_note"
    );

    await queryInterface.changeColumn("Notes", "lessonId", {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Lessons",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    });
}
