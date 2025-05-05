import { injectable } from "tsyringe";
import { SettingBoardReponsitory } from "../repositories/settingBoardReponsitory";
import { SettingBoardModel } from "../models/settingBoardModel";

@injectable()
export class SettingBoardService {
    constructor(private settingBoardReponsitory: SettingBoardReponsitory) { };

    async getSettingBoardById(settingBoard: SettingBoardModel): Promise<any> {
        return this.settingBoardReponsitory.getSettingBoardById(settingBoard);
    }

    async updateSettingBoard(settingBoard: SettingBoardModel): Promise<any> {
        return this.settingBoardReponsitory.updateSettingBoard(settingBoard);
    }
}