
import sequelize from "./database.js";

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();

        console.log("MySQL database connected successfully!");
    } catch (error) {
        console.error("Unable to connect to MySQL:", error.message);

        throw error;
    }
};

export default connectDatabase;
