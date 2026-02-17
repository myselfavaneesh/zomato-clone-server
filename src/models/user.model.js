import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: { value: true, message: 'Name is required' },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please provide a valid email address'
        },
        index: true
    },

    password: {
        type: String,
        required: { value: true, message: 'Password is required' },
        select: false,
    },
    role: {
        type: String,
        enum: { values: ['user', 'admin', 'owner', "captain"], message: 'Role must be either user, admin,captain, or owner' },
        default: 'user',
    },
    catianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;



