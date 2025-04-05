import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { Request, Response } from 'express';
import { generateToken } from "../config/jwt";
import { userSchema } from "../schemas/userSchema";

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
        const { error, value } = userSchema.validate(req.body); // check value
        console.log(req.body)
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const results = await this.userService.login(value);
            if (results) {
                const token = generateToken(results);
                results.token = token;

                // save token in cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    // maxAge: 60 * 60 * 1000, // set time for live 1h
                });

                return res.json({token: results.token, user_id: results.user_id, name: results.name, avatar: results.avatar });
            } else {
                return res.status(401).json({ message: "Error email or password!" });
            }
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
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