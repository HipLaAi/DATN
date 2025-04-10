import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user_id: string | null;
    user_name: string | null;
    user_avatar: string | null;
}

const initialState: UserState = {
    user_id: null,
    user_name: null,
    user_avatar: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.user_id = action.payload.user_id;
            state.user_name = action.payload.user_name;
            state.user_avatar = action.payload.user_avatar;
        },
        clearUser(state) {
            state.user_id = null;
            state.user_name = null;
            state.user_avatar = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
