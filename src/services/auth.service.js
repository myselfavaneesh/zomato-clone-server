import User from "../models/user.model.js";
import { generateAccessToken } from "../utils/jwt.utils.js";
import { AppError } from "../utils/AppError.js";
import { createCaptain } from "./captain.service.js";

export const registerUser = async ({ name, email, password, role }) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already exists", 400);
    }

    const user = new User({ name, email, password, role });

    if (role === "captain") {
        const captain = await createCaptain(user);
        await captain.save();
        await user.save();
    }

    await user.save();


    const token = generateAccessToken({
        userId: user._id,
        role: user.role
    });

    return { user, token };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError("Invalid email or password", 401)
    }
    const token = generateAccessToken({ userId: user._id, role: user.role });
    return { user, token };
}

export const fetchUserById = async (userId) => {
    const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt _id");
    if (!user) {
        throw new AppError("User not found", 401);
    }
    return user;

}
