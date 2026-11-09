
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error("Authentication token required");
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findByPk(decoded.sub);

        if (!user) {
            const error = new Error("User no longer exists");
            error.statusCode = 401;
            throw error;
        }

        req.user = user;

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            const authError = new Error("Invalid or expired token");
            authError.statusCode = 401;
            return next(authError);
        }

        next(error);
    }
};

export default authMiddleware;
