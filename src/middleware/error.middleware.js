const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = undefined;

    // Zod validation error
    if (err.name === "ZodError") {
        statusCode = 400;
        message = "Validation failed";

        errors = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;

        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message
        }));

        message = "Validation failed";
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid course ID";
    }

    // Duplicate value
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate value already exists";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};

export default errorMiddleware;