import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Business} from "../../shared/models";
import {ErrorResult} from "../debug/debug.slice";


// Define the initial state
interface BusinessesState {
    businesses: Business[];
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: BusinessesState = {
    businesses: [],
    loading: false,
    error: null
};

// Create the slice
export const businessesSlice = createSlice({
    name: 'businesses',
    initialState,
    reducers: {
        loadBusinessesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadBusinessesSuccess: (state, action: PayloadAction<Business[]>) => {
            state.businesses = action.payload;
            state.loading = false;
            state.error = null;
        },
        loadBusinessesFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the slice actions
export const { loadBusinessesStart, loadBusinessesSuccess, loadBusinessesFailure } = businessesSlice.actions;

// Export the slice reducer
export default businessesSlice.reducer;
