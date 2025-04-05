import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Get the JWT token from the Authorization header
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.cookies.token
    if (!token) {
        return res.status(403).json({ message: 'You are not authorized!' });
    }
    // Verify the token
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(403).json({ message: 'You are not authorized!' });
    }
    (req as any).user = decodedToken;
    next();
};