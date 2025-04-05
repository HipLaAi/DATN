export interface CardModel {
    card_id?: number;
    column_id?: number;
    name?: string;
    description?: string;
    background?: string;
    user_id_join?: string;
    start_date?: Date;
    end_date?: Date;
    timer?: Date;
    status?: string;
    user_id?: number;
}