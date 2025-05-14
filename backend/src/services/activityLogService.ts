import { injectable } from "tsyringe";
import { ActivityLogReponsitory } from "../repositories/activityLogReponsitory";
import { ActivityLogModel } from "../models/activityLogModels";

@injectable()
export class ActivityLogService {
    constructor(private activityLogReponsitory: ActivityLogReponsitory) { };

    async createActivityLog(activityLog: ActivityLogModel): Promise<any> {
        return this.activityLogReponsitory.createActivityCard(activityLog);
    }

    async getActivityCard(activityLog: ActivityLogModel): Promise<any> {
        return this.activityLogReponsitory.getActivityCard(activityLog);
    }
}