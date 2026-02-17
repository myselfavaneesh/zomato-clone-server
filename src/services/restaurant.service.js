import { Restaurant } from "../models/restaurant.model.js";
import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

import { sendResponse } from "../utils/res.utils.js";
export const createRestaurant = async (data) => {
    const existingOwner = await User.findOne({ _id: data.owner });
    if (!existingOwner) {
        throw new AppError("Owner not found",  );
    }

    const existingRestaurant = await Restaurant.findOne({ name: data.name });
    if (existingRestaurant) {
        throw new AppError("Restaurant with this name already exists", 400);
    }

    const restaurant = new Restaurant(data);
    await restaurant.save();

    return restaurant;
}

export const getAllRestaurants = async () => {
    return await Restaurant.find();
}

export const getRestaurantById = async (id) => {
    return await Restaurant.findById(id);
}

export const updateRestau = async (id, data) => {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
        throw new AppError("Restaurant not found", 404);
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, data, { new: true });
    return updatedRestaurant;
}

export const deleteRestau = async (id) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        throw new AppError("Restaurant not found", 404);
    }
    await Restaurant.findByIdAndDelete(id);
    return;
}