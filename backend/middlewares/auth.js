import verify from 'jsonwebtoken';
import User from '../models/userModel.js';
import { SECRET_KEY } from "../config.js";

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Authentication required' });

    try {
        const decodedToken = verify(token, SECRET_KEY);
        const user = await User.findById(decodedToken.userId);

        if (!user)
            return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

export default authenticate;