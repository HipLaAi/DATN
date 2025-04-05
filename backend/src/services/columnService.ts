import { injectable } from "tsyringe";
import { ColumnReponsitory } from "../repositories/columnRepository";
import { ColumnModel } from "../models/columnModel";

@injectable()
export class ColumnService {
    constructor(private columnReponsitory: ColumnReponsitory) {};

    async createColumn(column: ColumnModel): Promise<any> {
        console.log(column)
        return this.columnReponsitory.createColumn(column);
    }

    async updateInformationColumn(column: ColumnModel): Promise<any> {
        return this.columnReponsitory.updateInformationColumn(column);
    }

    async updateColumnWhenMoveCard(column: ColumnModel): Promise<any> {
        return this.columnReponsitory.updateColumnWhenMoveCard(column);
    }

    async deleteColumn(id: string): Promise<any> {
        return this.columnReponsitory.deleteColumn(id);
    }

    async getAllColumnByBoardID(id: string): Promise<any> {
        return this.columnReponsitory.getAllColumnByBoardID(id);
    }
}