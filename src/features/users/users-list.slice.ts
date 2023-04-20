import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../../shared/models";
import {ErrorResult} from "../debug/debug.slice";

interface UsersState {
    users: User[];
    searchedUser: User[]|null;
    searchTerm:string|null;
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: UsersState = {
    users: [],
    searchedUser:null,
    searchTerm:null,
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
            state.searchTerm = null;
            state.searchedUser = null;
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.error = null;
            state.users = action.payload;
            state.searchTerm = null;
            state.searchedUser = null;
        },
        getUsersFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
            state.searchTerm = null;
            state.searchedUser = null;
        },
        searchUser: (state, action: PayloadAction<{searchTerm:string}>) => {
            state.searchTerm = action.payload.searchTerm;
            state.searchedUser = searchUsers(action.payload.searchTerm, state.users);
        },
        clearSearch: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = null;
            state.searchTerm = null;
            state.searchedUser = null;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, searchUser, clearSearch } = usersSlice.actions;

export default usersSlice.reducer;
const searchUsers = (searchTerm: string, users: User[]): User[] => {
    searchTerm = searchTerm.toLowerCase();
    return users.filter(user => {
        const firstName = user?.firstName?.toLowerCase() || '';
        const lastName = user?.lastName?.toLowerCase() || '';
        const displayName = user?.displayName?.toLowerCase() || '';
        const phoneNumber = user?.phoneNumber?.toLowerCase() || '';
        const uid = user?.uid?.toLowerCase() || '';

        return firstName.includes(searchTerm) ||
            lastName.includes(searchTerm) ||
            displayName.includes(searchTerm) ||
            phoneNumber.includes(searchTerm) ||
            uid.includes(searchTerm);
    });
};
