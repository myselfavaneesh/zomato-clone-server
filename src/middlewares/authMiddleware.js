import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js";
// const tokenBlackListModel = require("../models/blackList.model.js")


export async function authenticate(req, res, next) {

    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login to continue"
        })
    }

    // const isBlacklisted = await tokenBlackListModel.findOne({ token })

    // if (isBlacklisted) {
    //     return res.status(401).json({
    //         message: "Unauthorized access, token is invalid"
    //     })
    // }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded

        return next()

    } catch (err) {
        return res.status(401).json({
            message: `Unauthorized access, ${err.message == "TokenExpiredError" ? "Token expired" : "Invalid token"}`
        })
    }
}


export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new AppError("User not authenticated", 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError(`Role ${req.user.role} is not allowed to access this resource`, 403);
        }

        next();
    };
};
