
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { BadRequestError } from "../utils/AppError.js";

// REGISTER USER
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check whether email already exists
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new BadRequestError("Email is already registered");
    }

    // Password will be hashed automatically by User model hook
    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    });
};

// LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Fetch user including password
    const user = await User.unscoped().findOne({
        where: { email }
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Generate JWT
    const token = jwt.sign(
        { role: user.role },
        process.env.JWT_SECRET,
        {
            subject: String(user.id),
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

export const getCurrentUser = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};