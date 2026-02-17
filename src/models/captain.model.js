import mongoose from "mongoose";


const captainSchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
        default: false,
    },
    captainId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;