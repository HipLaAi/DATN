import { Column } from "./ColumnModel";

export interface Board {
  board_id: string;
  name?: string,
  description?: string,
  type?: string,
  ownerIds?: string[],
  memberIds?: string[],
  columnOrderIds?: string[],
  column: Column[];
  status:string,
  background?:File | string;
};