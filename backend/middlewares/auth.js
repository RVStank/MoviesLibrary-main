import verify from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorizations?.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Authentication required' });

    try {
        const decodedToken = verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.userId);

        if (!user)
            return response.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    }
    catch (error) {
        response.status(401).json({ message: 'Invalid token' })
    }
}

export default { authenticate };