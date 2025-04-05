import { injectable } from "tsyringe";
import { FileReponsitory } from "../repositories/fileRepository";
import { FileModel } from "../models/fileModel";

@injectable()
export class FileService {
    constructor(private fileReponsitory: FileReponsitory) {};

    async createFile(card: FileModel): Promise<any> {
        return this.fileReponsitory.createFile(card);
    }

    async deleteFile(id: string): Promise<any> {
        return this.fileReponsitory.deleteFile(id);
    }
}