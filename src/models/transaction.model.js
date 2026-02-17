import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["completed", "failed"],
            default: "completed"
        },
        paymentMethod: {
            type: String,
            enum: ["UPI", "COD"]
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;