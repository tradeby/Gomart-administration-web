import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ErrorResult {
    message?: string;
    status: number;
}

export interface SUsers {
    id: string,
    born: number,
    first: string,
    last: string,
    middle: string,
}

export interface DebugState {
    sUser?: SUsers[],
    loading: boolean;
    error?: ErrorResult;
}

const initialState: DebugState = {
    loading: true,
}

export const debugSlice = createSlice({
    name: 'debugSlice',
    initialState,
    reducers: {
        onLoadSampleUserData: (state): DebugState => {
            return {...state, loading: true}
        },

        onUpdateSampleUserData: (state, payload: PayloadAction<SUsers[]>): DebugState => {
            console.log('updated sample data', payload.payload);
            return {
                sUser: payload.payload,
                loading: false
            }
        },
        onErrorLoadingSampleUserData: (state, res: PayloadAction<{
            message: string
            status: number
        }>): DebugState => {
            return {
                ...state, loading: false, error: {
                    message: res.payload?.message,
                    status: res.payload.status
                }
            };
        },
    }
});

export const {
    onLoadSampleUserData, onUpdateSampleUserData, onErrorLoadingSampleUserData
} = debugSlice.actions;
export default debugSlice.reducer;
