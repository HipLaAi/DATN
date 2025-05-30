export interface Card {
  card_id: string,
  column_id: string,
  name: string,
  description: string | null,
  background: string | null,
  user_id_join: string[],
  comments: string[],
  attachments: string[]
  status: string,
  userjoin?: any[],
  label?: any[],
  start_date?: any[],
  end_date?: any[]

  FE_PlaceholderCard: boolean
};
