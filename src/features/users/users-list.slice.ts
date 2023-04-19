import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../../shared/models";
import {ErrorResult} from "../debug/debug.slice";

interface UsersState {
    users: User[];
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.error = null;
            state.users = action.payload;
        },
        getUsersFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } = usersSlice.actions;

export default usersSlice.reducer;
