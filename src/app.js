const express = require("express");

const app = express();

const courseRoutes = require("./routes/cource.routes");

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Online Course Backend is running!"
    });
});

app.use("/api/courses", courseRoutes);

module.exports = app;