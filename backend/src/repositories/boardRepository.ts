import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { BoardModel } from "../models/boardModel";

@injectable()
export class BoardReponsitory {
    constructor(private db: Database) { };

    async createBoard(board: BoardModel): Promise<any> {
        try {
            const sql = 'call CreateBoard(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.workspace_id,
                board.name,
                board.description,
                board.background,
                board.status,
                board.user_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                if (!results[0].description) {
                    results[0].description = '';
                }
                if (!results[0].column) {
                    results[0].column = [];
                }
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateIBoard(board: BoardModel): Promise<any> {
        try {
            const sql = 'call UpdateIBoard(?, ?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                board.board_id,
                board.workspace_id,
                board.name,
                board.description,
                board.status
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateBackgroundBoard(board: BoardModel): Promise<any> {
        try {
            const sql = 'call UpdateBackgroundBoard(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.board_id,
                board.background
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateBoardWhenMoveColumn(board: BoardModel): Promise<any> {
        try {
            const sql = 'call UpdateBoardWhenMoveColumn(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                board.board_id,
                board.column_id_order?.toString()

            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getBoardById(board: BoardModel): Promise<any> {
        try {
            const sql = 'call GetBoardByID(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.board_id,
                board.user_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                if (!results[0].description) {
                    results[0].description = '';
                }
                if (!results[0].column) {
                    results[0].column = [];
                }
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteBoard(id: string): Promise<any> {
        try {
            const sql = 'call DeleteBoard(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createGuest(board: BoardModel): Promise<any> {
        try {
            const sql = 'call CreateGuest(?, ?, ?,  @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.board_id,
                board.user_id,
                board.role,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getBoardByCustom(board: BoardModel): Promise<any> {
        try {
            const sql = 'call GetBoardByCustom(?, ?, ?, ?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                board.board_id,
                board.user_id,
                board.card_status,
                board.labelboard_id,
                board.expired_only,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteGuest(board: BoardModel): Promise<any> {
        try {
            const sql = 'call DeleteGuest(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                board.board_id,
                board.user_id
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateRoleGuest(board: BoardModel): Promise<any> {
        try {
            const sql = 'call UpdateRoleGuest(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                board.board_id,
                board.user_id,
                board.role,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}