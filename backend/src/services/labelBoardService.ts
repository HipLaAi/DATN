import { injectable } from "tsyringe";
import { LabelBoardReponsitory } from "../repositories/labelBoardReponsitory";
import { LabelBoardModel } from "../models/labelBoardModel";

@injectable()
export class LabelBoardService {
    constructor(private labelBoardReponsitory: LabelBoardReponsitory) { };

    async getLabelBoardById(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.getLabelBoardById(labelBoard);
    }

    async createLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.createLabelBoard(labelBoard);
    }

    async updateLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.updateLabelBoard(labelBoard);
    }

    async deleteLabelBoard(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.deleteLabelBoard(labelBoard);
    }

    async createLabel(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.createLabel(labelBoard);
    }

    async deleteLabel(labelBoard: LabelBoardModel): Promise<any> {
        return this.labelBoardReponsitory.deleteLabel(labelBoard);
    }
}