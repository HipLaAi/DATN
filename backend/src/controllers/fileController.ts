import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";
import { FileService } from "../services/fileService";
import { fileSchema } from "../schemas/fileSchema";

const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class FileController {
    constructor(private fileService: FileService) { }

    async createFile(req: Request, res: Response): Promise<any> {
        const { error, value } = fileSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            console.log(files);

            const filePaths = files.map(file => file.path);
            const user = (req as any).user;
            const results = await this.fileService.createFile({
                ...value,
                path: filePaths,
                user_id: user.user_id,
            });
            return res.status(200).json(results);

        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteFile(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const oldFilePath  = await this.fileService.deleteFile(id);
            uploadMiddleware.Remove(oldFilePath.old_path);
            return res.status(200).json(oldFilePath);
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }
}