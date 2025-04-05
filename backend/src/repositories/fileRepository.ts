import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { FileModel } from "../models/fileModel";

@injectable()
export class FileReponsitory {
    constructor(private db: Database) { };

    async createFile(file: FileModel): Promise<any> {
        try {
            const sql = 'call CreateFile(?, ?, ?, @err_code, @err_msg)';

            const [results] = await this.db.query(sql, [
                file.card_id,
                file.user_id,
                file.path
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async deleteFile(id: string): Promise<any> {
        try {
            const sql = 'call DeleteFile(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}