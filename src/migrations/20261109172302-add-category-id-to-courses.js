
import { DataTypes } from "sequelize";

export async function up({ context: queryInterface }) {
    await queryInterface.addColumn("Courses", "categoryId", {
        type: DataTypes.INTEGER,
        allowNull: true,

        references: {
            model: "Categories",
            key: "id"
        },

        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    });
}

export async function down({ context: queryInterface }) {
    await queryInterface.removeColumn("Courses", "categoryId");
}
