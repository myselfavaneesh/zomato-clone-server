import { AppError } from "../utils/appError.js";
import Captain from "../models/captain.model.js";
import { v4 as uuidv4 } from 'uuid';


export const createCaptain = async (user) => {
    try {
        const existingCaptain = await Captain.findOne({ userId: user._id });
        if (existingCaptain) {
            throw new AppError("Captain profile already exists for this user", 400);
        }
        const newCaptain = new Captain({
            captainId: `CAPT-${uuidv4().replace(/-/g, "").slice(0, 10).toUpperCase()}`,
            userId: user._id,
        });
        return newCaptain;
    }
    catch (error) {
        throw new AppError("Failed to create captain profile", 500);
    }
};

export const getCaptainByUserId = async (userId) => {
    try {
        const captain = await Captain.findOne({ userId }).select("-__v -createdAt -updatedAt");
        if (!captain) {
            throw new AppError("Captain profile not found for this user", 404);
        }
        return captain;
    }
    catch (error) {
        throw new AppError("Failed to fetch captain profile", 500);
    }
};


export const getCaptainById = async (captainId) => {
    try {
        const captain = await Captain.findOne({ captainId }).select("-__v -createdAt -updatedAt").populate({
            path: "userId",
            select: "name email"
        });

        if (!captain) {
            throw new AppError("Captain not found", 404);
        }
        return captain;
    }
    catch (error) {
        throw new AppError("Failed to fetch captain", 500);
    }
};

export const getAvailableCaptains = async () => {
    try {
        return await Captain.find({ isAvailable: true }).select("-__v -createdAt -updatedAt");
    }
    catch (error) {
        throw new AppError("Failed to fetch available captains", 500);
    }
};

export const updateCaptainAvailability = async (captainId, isAvailable) => {
    try {
        const captain = await Captain.findOne({ captainId });
        if (!captain) {
            throw new AppError("Captain not found", 404);
        }
        captain.isAvailable = isAvailable;
        await captain.save();
        return captain;
    }
    catch (error) {
        throw new AppError("Failed to update captain availability", 500);
    }
};