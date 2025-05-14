import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { CommentModel } from "../models/commentModel";

@injectable()
export class CommentReponsitory {
    constructor(private db: Database) { };

    async createComment(comment: CommentModel): Promise<any> {
        try {
            const sql = 'call CreateComment(?, ?, ?, @err_code, @err_msg)';
            const results = await this.db.query(sql, [
                comment.card_id,
                comment.user_id,
                comment.comment,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateComment(comment: CommentModel): Promise<any> {
        try {
            const sql = 'call UpdateComment(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                comment.comment_id,
                comment.comment,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteComment(comment: CommentModel): Promise<any> {
        try {
            const sql = 'call DeleteComment(?, @err_code, @err_msg)';
            await this.db.query(sql, [
                comment.comment_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}