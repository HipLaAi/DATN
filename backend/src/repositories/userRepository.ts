import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { UserModel } from "../models/userModel";

@injectable()
export class UserReponsitory {
    constructor(private db: Database) { };

    async createUser(user: UserModel): Promise<any> {
        try {
            const sql = 'call CreateUser(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                user.name,
                user.email,
                user.password,
                user.avatar
            ]);
            return true;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getUserByAccount(user: UserModel): Promise<any> {
        try {
            const sql = 'call GetUserByAccount(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                user.email
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(user: UserModel): Promise<any> {
        try {
            const sql = 'call GetUserByEmail(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                user.email
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}