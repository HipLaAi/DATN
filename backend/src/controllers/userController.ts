import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt";
import { userSchema } from "../schemas/userSchema";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config";

const client = new OAuth2Client(config.google.clientId);

@injectable()
export class UserController {
    constructor(private userService: UserService) { }

    async register(req: Request, res: Response): Promise<any> {
        const { error, value } = userSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);
            await this.userService.register({
                ...value,
                avatar: filePaths,
            });
            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            if (error.message.includes('Duplicate entry')) {
                return res.status(409).json({ message: 'Email is already in use', results: false });
            }
            return res.status(500).json({ message: 'Internal server error', results: false });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const user = await this.userService.login(value);

            if (!user) {
                return res.status(401).json({ message: 'Error email or password!' });
            }

            const payload = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                accessToken,
                user_id: user.user_id,
                name: user.name,
                avatar: user.avatar,
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async googleLogin(req: Request, res: Response) {
        const token_id = req.body.token_id;
        if (!token_id) {
            return res.status(400).json({ message: "Missing Google ID token" });
        }

        try {
            const ticket = await client.verifyIdToken({
                idToken: token_id,
                audience: config.google.clientId
            });

            const payloadGoogle = ticket.getPayload();
            if (!payloadGoogle || !payloadGoogle.email) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            const user = await this.userService.googleLogin(payloadGoogle);

            const payload = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
            };

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                accessToken,
                user_id: user.user_id,
                name: user.name,
                avatar: user.avatar,
            });
        } catch (err) {
            return res.status(500).json({ message: 'Google login failed' });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<any> {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Missing refresh token' });
        }

        const user = verifyRefreshToken(refreshToken);
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const payload = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
        };

        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ accessToken: newAccessToken });
    }

    async search(req: Request, res: Response): Promise<any> {
        try {
            const results = await this.userService.search(req.body);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}