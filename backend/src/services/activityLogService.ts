import { injectable } from "tsyringe";
import { ActivityLogReponsitory } from "../repositories/activityLogReponsitory";
import { ActivityLogModel } from "../models/activityLogModels";

@injectable()
export class ActivityLogService {
    constructor(private activityLogReponsitory: ActivityLogReponsitory) { };

    async createActivityCard(activityLog: ActivityLogModel): Promise<any> {
        return this.activityLogReponsitory.createActivityCard(activityLog);
    }

    async getActivityCard(activityLog: ActivityLogModel): Promise<any> {
        return this.activityLogReponsitory.getActivityCard(activityLog);
    }

    async createActivityUser(activityLog: ActivityLogModel): Promise<any> {
        return this.activityLogReponsitory.createActivityUser(activityLog);
    }
}