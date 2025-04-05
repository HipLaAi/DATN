import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { CardModel } from "../models/cardModel";

@injectable()
export class CardReponsitory {
    constructor(private db: Database) { };

    async createCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call CreateCard(?, ?, ?, @err_code, @err_msg)';

            const [results] = await this.db.query(sql, [
                card.column_id,
                card.name,
                card.status
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateInformationCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call UpdateICard(?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                card.card_id,
                card.name,
                card.description,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCardByID(id: string): Promise<any> {
        try {
            const sql = 'call GetCardByID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async deleteCard(id: string): Promise<any> {
        try {
            const sql = 'call DeleteCard(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createUserJoinCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call CreateUserJoinCard(?, ?, @err_code, @err_msg)';

            const [results] = await this.db.query(sql, [
                card.card_id,
                card.user_id
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteUserJoincard(card: CardModel): Promise<any> {
        try {
            const sql = 'call DeleteUserJoincard(?, ?, @err_code, @err_msg)';

            await this.db.query(sql, [
                card.card_id,
                card.user_id
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAllCardByBoardID(id: string): Promise<any> {
        try {
            const sql = 'call GetAllCardByBoardID(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [id]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }

            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateTimeCard(card: CardModel): Promise<any> {
        try {
            const sql = 'call UpdateTimeCard(?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                card.card_id,
                card.start_date,
                card.end_date,
                card.timer
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateCardByColumnID(card: CardModel): Promise<any> {
        try {
            const sql = 'call UpdateCardByColumnID(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                card.card_id,
                card.column_id,
            ]);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCardByColumn(boardID: string): Promise<any> {
        try {
            const sql = 'call GetCardByColumn(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [boardID]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getCardByUser(boardID: string): Promise<any> {
        try {
            const sql = 'call GetCardByUser(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [boardID]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}