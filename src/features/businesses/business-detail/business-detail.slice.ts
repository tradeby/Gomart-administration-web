import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Business} from "../../../shared/models";
import {ErrorResult} from "../../debug/debug.slice";

// Define the initial state
interface BusinessState {
    business: Business | null;
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: BusinessState = {
    business: null,
    loading: false,
    error: null
};

// Create the slice
export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        loadBusinessStart: (state, action:PayloadAction<{businessId:string}>) => {
            state.loading = true;
            state.error = null;
        },
        loadBusinessSuccess: (state, action: PayloadAction<Business>) => {
            state.business = action.payload;
            state.loading = false;
            state.error = null;
        },
        loadBusinessFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the slice actions
export const { loadBusinessStart, loadBusinessSuccess, loadBusinessFailure } = businessSlice.actions;

// Export the slice reducer
export default businessSlice.reducer;
