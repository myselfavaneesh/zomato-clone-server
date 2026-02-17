import Transaction from "../models/transaction.model.js";
import {AppError} from "../utils/appError.js";


export const createTransaction = async (transactionData) => {
    try {
        const transaction = await Transaction.create(transactionData);
        return transaction;
    } catch (error) {
        throw new AppError("Failed to create transaction", 500);
    }
};

export const getTransactionById = async (transactionId) => {
    try {
        const transaction = await Transaction.findById(transactionId).populate("orderId");
        if (!transaction) {
            throw new AppError("Transaction not found", 404);
        } return transaction;
    } catch (error) {
        throw new AppError("Failed to retrieve transaction", 500);
    }
};

export const updateTransactionStatus = async (transactionId, status) => {
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            throw new AppError("Transaction not found", 404);
        }
        transaction.status = status;
        await transaction.save();
        return transaction;
    } catch (error) {
        throw new AppError("Failed to update transaction status", 500);
    }
};

export const deleteTransaction = async (transactionId) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        if (!transaction) {
            throw new AppError("Transaction not found", 404);
        }
        return transaction;
    } catch (error) {
        throw new AppError("Failed to delete transaction", 500);
    }
};

