
import express from "express";

import courseRoutes from "./routes/cource.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Online Course Backend is running!"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Error middleware must be last
app.use(errorMiddleware);

export default app;
