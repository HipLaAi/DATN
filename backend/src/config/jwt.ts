import jwt from 'jsonwebtoken';
import { config } from './config';

export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    });
};

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
};

export const verifyAccessToken = (token: string): any => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch {
        return null;
    }
};

export const verifyRefreshToken = (token: string): any => {
    try {
        return jwt.verify(token, config.jwt.refreshSecret);
    } catch {
        return null;
    }
};