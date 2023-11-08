import sign from 'jsonwebtoken';
import { hash } from 'bcrypt';
import User from '../models/userModel.js';
import { response } from 'express';

// Register
const register = async (req, res, next) => {
    const { username, email, password } = req.body

    try {
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Registration successful' });
    }
    catch (error) {
        next(error);
    }
};

// Login
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await findOne({ username });
        if (!user)
            return response.status(404).json({ message: 'User not found' });

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch)
            return response.status(404).json({ message: 'Incorrect password' });

        const token = sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };