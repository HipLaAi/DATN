export interface BoardModel {
    board_id?: number;
    workspace_id?: number;
    name?: string;
    description?: string;
    background?: string;
    column_id_order?: string;
    status?: string;

    user_id?: number;
}