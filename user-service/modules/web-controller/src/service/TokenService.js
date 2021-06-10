import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SIGNIN_KEY, { expiresIn: '12h' });
};