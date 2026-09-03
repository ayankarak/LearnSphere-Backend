// class AppError extends Error {
//     constructor(message, statusCode) {
//         super(message);

//         this.statusCode = statusCode;
//         this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// export default AppError;

export class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "InternalServerError";
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "BadRequestError";
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.name = "ConflictError";
    }
}

export class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 501;
        this.name = "NotImplementedError";
    }
}