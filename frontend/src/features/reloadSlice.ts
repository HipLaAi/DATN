import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaceReload: false,
  boardReload: false,
  memberReload: false,
  boardDetailReload: false,
  cardDetailReload: false,
};

const reloadSlice = createSlice({
  name: 'reload',
  initialState,
  reducers: {
    workspaceReload(state) {
      state.workspaceReload = !state.workspaceReload;
    },
    boardReload(state) {
      state.boardReload = !state.boardReload;
    },
    memberReload(state) {
      state.memberReload = !state.memberReload;
    },
    boardDetailReload(state) {
      state.boardDetailReload = !state.boardDetailReload;
    },
    cardDetailReload(state) {
      state.cardDetailReload = !state.cardDetailReload;
    },
  },
});

export const {
  workspaceReload,
  boardReload,
  memberReload,
  boardDetailReload,
  cardDetailReload,
} = reloadSlice.actions;

export default reloadSlice.reducer;
