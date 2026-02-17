import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    cuisine: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuisine',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
