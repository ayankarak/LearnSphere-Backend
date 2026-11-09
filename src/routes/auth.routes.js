
import express from "express";

import {registerUser, loginUser, getCurrentUser} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {registerSchema,loginSchema} from "../validators/auth.validator.js";

const router = express.Router();

router.post( "/register",validate(registerSchema), registerUser );
router.post( "/login", validate(loginSchema), loginUser );
router.get("/me", authMiddleware, getCurrentUser);

export default router;
