import { Board } from "./BoardModel"

export interface WorkSpace {
  workspace_id: string|"",
  name?: string,
  description: string|null,
  background?: File|null,
  status?: string
  boards?:Board[]|[]
};