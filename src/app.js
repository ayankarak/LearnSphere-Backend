import express from "express";

const app = express();

import courseRoutes from "./routes/cource.routes.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Online Course Backend is running!"
    });
});

app.use("/api/courses", courseRoutes);

export default app;