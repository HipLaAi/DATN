import { injectable } from "tsyringe";
import { CommentReponsitory } from "../repositories/commentReponsitory";
import { CommentModel } from "../models/commentModel";

@injectable()
export class CommentService {
    constructor(private commentReponsitory: CommentReponsitory) { };

    async createComment(comment: CommentModel): Promise<any> {
        return this.commentReponsitory.createComment(comment);
    }

    async updateComment(comment: CommentModel): Promise<any> {
        return this.commentReponsitory.updateComment(comment);
    }

    async deleteComment(comment: CommentModel): Promise<any> {
        return this.commentReponsitory.deleteComment(comment);
    }
}