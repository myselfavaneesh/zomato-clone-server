import { registerUser, loginUser, fetchUserById } from "../services/auth.service.js";
import { sendResponse } from "../utils/res.utils.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const { user, token } = await registerUser({
            name,
            email,
            password,
            role
        });

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        sendResponse(res, 201, "User registered successfully", {
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        next(error); // centralized error handler
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser({ email, password });

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: false,          // true in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        sendResponse(res, 200, "Login successful", {
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        next(error); // centralized error handler
    }
};


export const fetchUser = async (req, res, next) => {
    try {
        const user = await fetchUserById(req.user.userId);
        sendResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error); // centralized error handler
    }
};