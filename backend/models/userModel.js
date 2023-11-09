import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    { timestamps: true }
);

// Hash password before sending to DB
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        // const salt = await genSalt();
        // user.password = await hash(user.password, salt);
        next();
    }
    catch (error) {
        return next(error);
    }
});

// Check for matching hashed password in DB
userSchema.methods.comparePassword = async function (password) {
    return compare(password, this.password);
}

const User = model('User', userSchema);

export default User;