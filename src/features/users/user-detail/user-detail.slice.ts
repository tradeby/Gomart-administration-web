import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../../../shared/models";
import {ErrorResult} from "../../debug/debug.slice";

interface UserState {
    user: User | null;
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserStart: (state, action:PayloadAction<{userId:string}>) => {
            state.loading = true;
            state.error = null;
        },
        loadUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
        },
        loadUserFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loadUserStart,
    loadUserSuccess,
    loadUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
