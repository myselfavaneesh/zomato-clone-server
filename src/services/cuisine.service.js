import { Cuisine } from '../models/cuisine.model.js';
import { AppError } from "#utils"
import { getRestaurantById } from './restaurant.service.js';

export const createCuisine = async (data) => {
    await getRestaurantById(data.restaurantId);

    const existingCuisine = await Cuisine.findOne({ name: data.name, restaurant: data.restaurantId });
    if (existingCuisine) {
        throw new AppError("Cuisine with this name already exists in the restaurant", 400);
    }

    const cuisine = new Cuisine({
        name: data.name,
        description: data.description,
        stock: data.stock,
        restaurant: data.restaurantId,
    });
    await cuisine.save();
    return cuisine;
}

export const getAllCuisines = async (restaurantId) => {
    await getRestaurantById(restaurantId);
    const cuisines = await Cuisine.find({ restaurant: restaurantId });
    if (cuisines.length === 0) {
        throw new AppError("No cuisines found for this restaurant", 404);
    }
    return cuisines;
}

export const getCuisineById = async (id) => {
    const cuisine = await Cuisine.findById(id);
    if (!cuisine) {
        throw new AppError("Cuisine not found", 404);
    }
    return cuisine;
}

export const updateCuisine = async (id, data) => {
    const cuisine = await Cuisine.findById(id);
    if (!cuisine) {
        throw new AppError("Cuisine not found", 404);
    }
    const updatedCuisine = await Cuisine.findByIdAndUpdate(id, data, { new: true });
    return updatedCuisine;
}

export const deleteCuisine = async (id) => {
    const cuisine = await Cuisine.findById(id);
    if (!cuisine) {
        throw new AppError("Cuisine not found", 404);
    }
    await Cuisine.findByIdAndDelete(id);
    return;
}
