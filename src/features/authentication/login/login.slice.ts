import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ErrorResult} from "../../debug/debug.slice";
import {AppUser} from "./app-user.model";

export interface LoginState {
    loginInProgress: boolean;
    user?: AppUser | null, // You can customize this as per your user object
    error: ErrorResult | null
}

const initialState: LoginState = {
    loginInProgress: false,
    user: null,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        attemptLogin: (state, props: PayloadAction<{ email: string; password: string }>): LoginState => {
            return {loginInProgress: true, user: null, error: null}
        },
        loginSuccess: (state, props: PayloadAction<{ user: AppUser }>): LoginState => {
            console.log(props.payload);
            return {loginInProgress: false, user: props?.payload.user, error: null}
        },
        loginFailure: (state, props: PayloadAction<{ error: ErrorResult }>): LoginState => {
            return {loginInProgress: false, user: null, error: props.payload.error};
        },
        logout: (state) => {
            return {loginInProgress: false, user: null, error: null};
        }
    },
});

export const {attemptLogin, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;
