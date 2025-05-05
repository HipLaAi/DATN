import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { LabelBoardModel } from "../models/labelBoardModel";

@injectable()
export class LabelBoardReponsitory {
    constructor(private db: Database) { };

    async getLabelBoardById(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call GetLabelBoardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                labelBoard.board_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call CreateLabelBoard(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                labelBoard.board_id,
                labelBoard.name,
                labelBoard.background,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call UpdateLabelBoard(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                labelBoard.labelboard_id,
                labelBoard.board_id,
                labelBoard.name,
                labelBoard.background,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call DeleteLabelBoard(?, @err_code, @err_msg)';
            await this.db.query(sql, [
                labelBoard.labelboard_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createLabel(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call CreateLabel(?, ?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [
                labelBoard.labelboard_id,
                labelBoard.card_id,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteLabel(labelBoard: LabelBoardModel): Promise<any> {
        try {
            const sql = 'call DeleteLabel(?, @err_code, @err_msg)';
            await this.db.query(sql, [
                labelBoard.label_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}