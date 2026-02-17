import { sendResponse } from "../utils/res.utils.js";
import { createRestaurant, getAllRestaurants, getRestaurantById, updateRestau, deleteRestau } from "../services/restaurant.service.js";

export const createNewRestaurant = async (req, res, next) => {
    try {
        const { name, address, owner, city } = req.body;
        const restaurant = await createRestaurant({ name, address, owner: owner == undefined ? req.user.userId : owner, city });
        sendResponse(res, 201, "Restaurant created successfully", restaurant);
    }
    catch (error) {
        next(error);
    }
}

export const fetchAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await getAllRestaurants();
        if (restaurants.length === 0) {
            return sendResponse(res, 200, "No restaurants found", []);
        }
        sendResponse(res, 200, "Restaurants fetched successfully", restaurants);
    }
    catch (error) {
        next(error);
    }
}

export const fetchRestaurantById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const restaurant = await getRestaurantById(id);
        sendResponse(res, 200, "Restaurant fetched successfully", restaurant);
    }
    catch (error) {
        next(error);
    }
}

export const updateRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address, city } = req.body;

        const updatedRestaurant = await updateRestau(id, { name, address, city });

        sendResponse(res, 200, "Restaurant updated successfully", updatedRestaurant);
    } catch (error) {
        next(error);
    }
}

export const deleteRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteRestau(id);
        sendResponse(res, 200, "Restaurant deleted successfully");
    } catch (error) {
        next(error);
    }
}