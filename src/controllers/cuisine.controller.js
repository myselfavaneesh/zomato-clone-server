import { createCuisine, getAllCuisines, getCuisineById, updateCuisine, deleteCuisine } from '../services/cuisine.service.js';
import { sendResponse } from '../utils/res.utils.js';


export const createCuisineController = async (req, res, next) => {
    try {
        const cuisine = await createCuisine(req.body);
        sendResponse(res, 201, "Cuisine created successfully", cuisine);
    } catch (error) {
        next(error);
    }
}

export const getAllCuisinesController = async (req, res, next) => {
    try {
        const cuisines = await getAllCuisines(req.params.restaurantId);
        sendResponse(res, 200, "Cuisines retrieved successfully", cuisines);
    }
    catch (error) {
        next(error);
    }
}

export const getCuisineByIdController = async (req, res, next) => {
    try {
        const cuisine = await getCuisineById(req.params.id);
        sendResponse(res, 200, "Cuisine retrieved successfully", cuisine);
    } catch (error) {
        next(error);
    }
}

export const updateCuisineController = async (req, res, next) => {
    try {
        const updatedCuisine = await updateCuisine(req.params.id, req.body);
        sendResponse(res, 200, "Cuisine updated successfully", updatedCuisine);
    } catch (error) {
        next(error);
    }
}

export const deleteCuisineController = async (req, res, next) => {
    try {
        await deleteCuisine(req.params.id);
        sendResponse(res, 200, "Cuisine deleted successfully");
    } catch (error) {
        next(error);
    }
}