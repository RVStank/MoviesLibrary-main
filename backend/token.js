import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const payload = { userId };
    const options = {
        expiresIn: '1 hour',
        // Add additional options if needed
    };

    return jwt.sign(payload, process.env.SECRET_KEY, options);
};

export { generateToken };