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

    async googleLogin(payload: any): Promise<any> {
        const user = await this.userReponsitory.getUserByEmail(payload.email);
        console.log(user);
        if (user) {
            return {
                user_id: user[0].user_id,
                name: user[0].name,
                email: user[0].email,
                avatar: user[0].avatar
            };
        }
    
        const newUser : UserModel = {
            name: payload.name,
            email: payload.email,
            avatar: payload.picture,
            password: ''
        };
    
        const created = await this.userReponsitory.createUser(newUser);
        return {
            user_id: created.user_id,
            name: created.name,
            email: created.email,
            avatar: created.avatar
        };
    }
    
    async search(email: string): Promise<any> {
        return this.userReponsitory.getUserByEmail(email);
    }
}