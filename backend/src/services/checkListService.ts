import { injectable } from "tsyringe";
import { CheckListReponsitory } from "../repositories/checkListRepository";
import { CheckListModel } from "../models/checklistModel";

@injectable()
export class CheckListService {
    constructor(private checkListReponsitory: CheckListReponsitory) {};

    async createCheckListName(checkList: CheckListModel): Promise<any> {
        return this.checkListReponsitory.createCheckListName(checkList);
    }

    async updateCheckListName(checkList: CheckListModel): Promise<any> {
        return this.checkListReponsitory.updateCheckListName(checkList);
    }

    async deleteCheckListName(id: string): Promise<any> {
        return this.checkListReponsitory.deleteCheckListName(id);
    }

    async createCheckList(checkList: CheckListModel): Promise<any> {
        return this.checkListReponsitory.createCheckList(checkList);
    }

    async updateCheckList(checkList: CheckListModel): Promise<any> {
        return this.checkListReponsitory.updateCheckList(checkList);
    }

    async deleteCheckList(id: string): Promise<any> {
        return this.checkListReponsitory.deleteCheckList(id);
    }
}