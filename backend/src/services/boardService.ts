import { injectable } from "tsyringe";
import { BoardReponsitory } from "../repositories/boardRepository";
import { BoardModel } from "../models/boardModel";

@injectable()
export class BoardService {
    constructor(private boardReponsitory: BoardReponsitory) { };

    async createBoard(board: BoardModel): Promise<any> {
        return this.boardReponsitory.createBoard(board);
    }

    async updateIBoard(board: BoardModel): Promise<any> {
        return this.boardReponsitory.updateIBoard(board);
    }

    async updateBackgroundBoard(board: BoardModel): Promise<any> {
        return this.boardReponsitory.updateBackgroundBoard(board);
    }

    async updateBoardWhenMoveColumn(board: BoardModel): Promise<any> {
        return this.boardReponsitory.updateBoardWhenMoveColumn(board);
    }

    async getBoardById(board: BoardModel): Promise<any> {
        return this.boardReponsitory.getBoardById(board);
    }

    async deleteBoard(id: string): Promise<any> {
        return this.boardReponsitory.deleteBoard(id);
    }

    async createGuest(board: BoardModel): Promise<any> {
        return this.boardReponsitory.createGuest(board);
    }
    async getBoardByCustom(board: BoardModel): Promise<any> {
        return this.boardReponsitory.getBoardByCustom(board);
    }

    async deleteGuest(board: BoardModel): Promise<any> {
        return this.boardReponsitory.deleteGuest(board);
    }
}