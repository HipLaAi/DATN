import { injectable } from "tsyringe";
import { SettingCardReponsitory } from "../repositories/settingCardReponsitory";
import { SettingCardModel } from "../models/settingCardModel";

@injectable()
export class SettingCardService {
    constructor(private settingCardReponsitory: SettingCardReponsitory) { };

    async getSettingCardById(settingBoard: SettingCardModel): Promise<any> {
        return this.settingCardReponsitory.getSettingCardById(settingBoard);
    }

    async updateSettingCard(settingBoard: SettingCardModel): Promise<any> {
        return this.settingCardReponsitory.updateSettingCard(settingBoard);
    }
}