import { Card } from "./CardModel";

export interface Column {
  column_id: string,
  boardId: string,
  name: string,
  background?:File|[]
  status?: string|""
  cardOrderIds: string[]|[],
  card : (Card)[]|[];
};