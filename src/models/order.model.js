import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "cuisine",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        status: {
            type: String,
            enum: ["pending", "assigned", "confirmed", "delivered", "cancelled"],
            default: "pending"
        },
        deliveryAddress: {
            type: String,
            required: true
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true
        },
        transactionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
            required: true
        },
        assignedCaptainId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain"
        },
        captainStatus: {
            type: String,
            enum: ["waiting", "accepted", "rejected"],
            default: "waiting"
        },
        captainDetails: {
            name: String,
            email: String,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
