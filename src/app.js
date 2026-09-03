import express from "express";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

import courseRoutes from "./routes/cource.routes.js";

app.use(express.json());
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Online Course Backend is running!"
    });
});

app.use("/api/courses", courseRoutes);

export default app;