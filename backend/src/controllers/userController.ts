import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt";
import { userSchema } from "../schemas/userSchema";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config";
import nodemailer from 'nodemailer';

const client = new OAuth2Client(config.google.clientId);

@injectable()
export class UserController {
    constructor(private userService: UserService) { }

    async register(req: Request, res: Response): Promise<any> {
        const { error, value } = userSchema.validate(req.body);

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const user = await this.userService.register({
                ...value,
                avatar: "https://res.cloudinary.com/dqkog9xuj/image/upload/v1747490098/uploads/avatar_trang_1_cd729c335b-422022293.png.jpg",
            });

            const payload = {
                user_id: user.user_id,
                email: user.email,
                role: user.role
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
                name: user.name,
                avatar: user.avatar
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message });
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
                email: user.email,
                role: user.role
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
                name: user.name,
                avatar: user.avatar
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

            if (!user) {
                return res.status(200).json(false);
            }

            const payload = {
                user_id: user.user_id,
                email: user.email,
                role: user.role
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
                accessToken: accessToken,
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
            email: user.email,
            role: user.role
        };

        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            accessToken: newAccessToken
        });
    }

    async search(req: Request, res: Response): Promise<any> {
        // const { error, value } = userSchema.validate(req.body);
        // if (error) {
        //     return res.status(422).json({ message: error.details[0].message });
        // }
        try {
            const results = await this.userService.search(req.body.email);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserGrowthRate(req: Request, res: Response): Promise<any> {
        try {
            const month = parseInt(req.params.month);
            const results = await this.userService.getUserGrowthRate(month);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getNewUser(req: Request, res: Response): Promise<any> {
        try {
            const month = parseInt(req.params.month);
            const results = await this.userService.getNewUser(month);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActivityUser(req: Request, res: Response): Promise<any> {
        try {
            const results = await this.userService.getActivityUser();
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUser(req: Request, res: Response): Promise<any> {
        try {
            const results = await this.userService.getAllUser();
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActivityUserByRange(req: Request, res: Response): Promise<any> {
        try {
            const range = req.params.range;
            const results = await this.userService.getActivityUserByRange(range);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async sendVerificationEmail(req: Request, res: Response): Promise<any> {
        try {
            const { email } = req.body;

            const user = await this.userService.search(email)
            if (user) {
                return res.status(400).json({ message: 'Email đã tồn tại' });
            }

            const verificationCode = Math.floor(100000 + Math.random() * 900000);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "vuvanhiep05092003@gmail.com",
                    pass: "dpcg liel asym hhqp",
                },
            });

            const mailOptions = {
                from: "vuvanhiep05092003@gmail.com",
                to: email,
                subject: 'Mã xác nhận đăng ký',
                text: `Mã xác nhận của bạn là: ${verificationCode}`,
            };

            await transporter.sendMail(mailOptions);
            return res.status(200).json(verificationCode);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async logout(req: Request, res: Response): Promise<any> {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({ message: 'No refresh token found' });
            }

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });

            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

}