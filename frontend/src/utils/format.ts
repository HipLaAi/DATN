export const generatePlaceholderCard = (column:any) => {
  return {
    card_id: `${column?.column_id}-placeholder-card`,
    column_id: column?.column_id,
    FE_PlaceholderCard: true,
    name: "",
    description: "",
    background: "",
    user_id_join: [],
    comments: [],
    attachments: [],
    status: ""
  }
}
