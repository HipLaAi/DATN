import { injectable } from "tsyringe";
import { Request, Response } from 'express';
import { CommentService } from "../services/commentService";
import { commentSchema } from "../schemas/commentSchema";

@injectable()
export class CommentController {
    constructor(private commentService: CommentService) { }

    async createComment(req: Request, res: Response): Promise<any> {
        const { error, value } = commentSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {

            const results = await this.commentService.createComment(value);

            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async updateComment(req: Request, res: Response): Promise<any> {
        const { error, value } = commentSchema.validate(req.body); //check value

        if (error) {
            return res.status(422).json({ message: error.details[0].message });
        }

        try {
            const comment_id = parseInt(req.params.idComment);

            const updateData = {
                ...value,
                comment_id: comment_id,
            };

            const results = await this.commentService.updateComment(updateData);

            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }

    async deleteComment(req: Request, res: Response): Promise<any> {
        try {
            const comment_id = parseInt(req.params.idComment);

            const results = await this.commentService.deleteComment({
                comment_id: comment_id,
            });
            return res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message, results: false });
        }
    }
}