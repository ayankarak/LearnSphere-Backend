
import "dotenv/config";

import sequelize from "../config/database.js";
import migrator from "../config/migrator.js";

const runMigrations = async () => {
    try {
        await sequelize.authenticate();

        console.log("Database connected.");

        await migrator.up();

        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);

        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
};

runMigrations();
