import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { UserModel } from "../models/userModel";

@injectable()
export class UserReponsitory {
    constructor(private db: Database) { };

    async createUser(user: UserModel): Promise<any> {
        try {
            const sql = 'call CreateUser(?, ?, ?, ?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                user.name,
                user.email,
                user.password,
                user.avatar
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0][0];
            }

            return null;
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

    async getUserByEmail(email: string): Promise<any> {
        try {
            const sql = 'call GetUserByEmail(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                email
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getUserGrowthRate(month: number): Promise<any> {
        try {
            const sql = 'call GetUserGrowthRate(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                month
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getNewUser(month: number): Promise<any> {
        try {
            const sql = 'call GetNewUser(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                month
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getActivityUser(): Promise<any> {
        try {
            const sql = 'call GetActivityUser(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllUser(): Promise<any> {
        try {
            const sql = 'call GetAllUser(@err_code, @err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getActivityUserByRange(range: string): Promise<any> {
        try {
            const sql = 'call GetActivityUserByRange(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                range
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