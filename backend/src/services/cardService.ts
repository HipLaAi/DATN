import { injectable } from "tsyringe";
import { CardReponsitory } from "../repositories/cardRepository";
import { CardModel } from "../models/cardModel";

@injectable()
export class CardService {
    constructor(private cardReponsitory: CardReponsitory) {};

    async createCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.createCard(card);
    }

    async updateInformationCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.updateInformationCard(card);
    }

    async getCardByID(id: string): Promise<any> {
        return this.cardReponsitory.getCardByID(id);
    }

    async deleteCard(id: string): Promise<any> {
        return this.cardReponsitory.deleteCard(id);
    }

    async createUserJoinCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.createUserJoinCard(card);
    }

    async deleteUserJoincard(card: CardModel): Promise<any> {
        return this.cardReponsitory.deleteUserJoincard(card);
    }

    async getAllCardByBoardID(id: string): Promise<any> {
        return this.cardReponsitory.getAllCardByBoardID(id);
    }

    async updateTimeCard(card: CardModel): Promise<any> {
        return this.cardReponsitory.updateTimeCard(card);
    }

    async updateCardByColumnID(card: CardModel): Promise<any> {
        return this.cardReponsitory.updateCardByColumnID(card);
    }

    async getCardByColumn(id: string): Promise<any> {
        return this.cardReponsitory.getCardByColumn(id);
    }

    async getCardByUser(id: string): Promise<any> {
        return this.cardReponsitory.getCardByUser(id);
    }
}