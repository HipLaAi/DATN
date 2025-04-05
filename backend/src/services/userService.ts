import { injectable } from "tsyringe";
import { comparePassword, hashPassword, UserModel } from "../models/userModel";
import { UserReponsitory } from "../repositories/userRepository";

@injectable()
export class UserService {
    constructor(private userReponsitory: UserReponsitory) {};

    async register(user: UserModel): Promise<any> {
        await hashPassword(user);
        return this.userReponsitory.createUser(user);
    }

    async login(user: UserModel): Promise<any> {
        let results = await this.userReponsitory.getUserByAccount(user);
        let isMatch = await comparePassword(user.password, results.password);
        if (isMatch) {
            return {
                user_id: results.user_id,
                name: results.name,
                email: results.email,
                avatar: results.avatar
            };
        }
        return null;
    }

    async search(user: UserModel): Promise<any> {
        return this.userReponsitory.getUserByEmail(user);
    }
}