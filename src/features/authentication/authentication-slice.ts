import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppUser} from "./login/app-user.model";
type AuthStatusType = 'initial' | 'success' | 'failure';



export interface AuthenticationState {
    status: AuthStatusType,
    userId?: string,
    user?: AppUser,
}

const initialState: AuthenticationState = {status: "initial"}
//const authenticationSuccessState: AuthenticationState = {status: "success"}
const authenticationFailure: AuthenticationState = {status: "failure"}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticationStarted: (state) => initialState,
        authenticationLoggedIn: (state, payload: PayloadAction<{ authData?: AppUser }>): AuthenticationState => {
            return {status: "success", userId: payload.payload.authData?.uid, user: payload.payload.authData}
        },
        authenticationLoggedOut: (state) => {
            localStorage.clear();
            return authenticationFailure
        },
    },
})

export const {authenticationStarted, authenticationLoggedIn, authenticationLoggedOut} = authenticationSlice.actions;
export default authenticationSlice.reducer;
