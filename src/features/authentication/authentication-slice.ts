import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AuthStatusType = 'initial' | 'success' | 'failure';

export interface AuthenticationPayload {
    token: string
    expiration: string
    status: string
    message: string
    userId: string
    user: AppUser
}

export interface AppUser {
    firstName: string
    lastName: string
    id: string
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
}

export interface AuthenticationState {
    status: AuthStatusType,
    userId?: string,
    user?: AppUser,
    loginLoading?: boolean,
    loginError?: boolean,
    loginData?: AppUser
}

const initialState: AuthenticationState = {status: "initial"}
//const authenticationSuccessState: AuthenticationState = {status: "success"}
const authenticationFailure: AuthenticationState = {status: "failure"}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        authenticationStarted: (state) => initialState,
        authenticationLoggedIn: (state, payload: PayloadAction<{ authData?: AuthenticationPayload }>): AuthenticationState => {
            return {status: "success", userId: payload.payload.authData?.userId, user: payload.payload.authData?.user}
        },
        authenticationLoggedOut: (state) => authenticationFailure,
    },
})

export const {authenticationStarted, authenticationLoggedIn, authenticationLoggedOut} = authenticationSlice.actions;
export default authenticationSlice.reducer;
