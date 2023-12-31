import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import User from '../models/userModel.js';
import { SECRET_KEY } from "../config.js";

// Register
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

// Login
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        console.log('SECRET_KEY:', SECRET_KEY);

        const user = await User.findOne({ username });

        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch)
            return res.status(401).json({ message: 'Incorrect password' });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: '1 hour'
        });

        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };
