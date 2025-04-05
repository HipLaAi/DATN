import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { UploadMiddleware } from '../middlewares/uploadMiddleware';
import { container } from "tsyringe";
import { BoardService } from "../services/boardService";
import { boardSchema } from "../schemas/boardSchema";

const uploadMiddleware = container.resolve(UploadMiddleware);

@injectable()
export class BoardController {
    constructor(private boardService: BoardService) { }

    async createBoard(req: Request, res: Response): Promise<any> {
        const { error, value } = boardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);
            const user = (req as any).user;

            const results = await this.boardService.createBoard({
                ...value,
                background: filePaths,
                user_id: user.user_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateIBoard(req: Request, res: Response): Promise<any> {
        const { error, value } = boardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            const files = req.files as Express.Multer.File[];
            const filePaths = files.map(file => file.path);

            const oldFilePath = await this.boardService.updateIBoard({
                ...value,
                board_id: id,
                background: filePaths,
            });

            uploadMiddleware.Remove(oldFilePath.old_path);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateBoardWhenMoveColumn(req: Request, res: Response): Promise<any> {
        const { error, value } = boardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            await this.boardService.updateBoardWhenMoveColumn(value);

            return res.status(200).json({ message: 'Success', results: true });
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async getBoardById(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const results = await this.boardService.getBoardById(id);
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteBoard(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const oldFilePath = await this.boardService.deleteBoard(id);

            uploadMiddleware.Remove(oldFilePath.old_path);
            return res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }

    async createGuest(req: Request, res: Response): Promise<any> {
        const { error, value } = boardSchema.validate(req.body); //check value

        console.log(value);
        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const results = await this.boardService.createGuest(value);
            return res.status(200).json(results);
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }

    async getBoardByCustom(req: Request, res: Response): Promise<any> {

        const { error, value } = boardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            const results = await this.boardService.getBoardByCustom({
                ...value,
                board_id: id,
            });
            if (results) {
                res.status(200).json(results);
            } else {
                res.json({ message: 'Not exists' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteGuest(req: Request, res: Response): Promise<any> {
        const { error, value } = boardSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const id = req.params.id;
            const oldFilePath = await this.boardService.deleteGuest({
                ... value,
                board_id: id
            });

            uploadMiddleware.Remove(oldFilePath.old_path);
            return res.status(200).json({ message: 'Success', success: true });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, success: false });
        }
    }
}