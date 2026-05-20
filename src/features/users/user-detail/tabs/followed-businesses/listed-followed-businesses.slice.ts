import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Business, Product} from "../../../../../shared/models";
import {ErrorResult} from "../../../../debug/debug.slice";


// Define the initial state
interface ListedBusinessState {
    businesses: Business[];
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: ListedBusinessState = {
    businesses: [],
    loading: false,
    error: null
};

// Create the slice
export const listedFollowedBusinessesSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        fetchListedFollowedBusinessesStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = true;
            state.error = null;
        },
        reFetchListedFollowedBusinessesStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = false;
            state.error = null;
        },
        deleteFollowedBusiness: (state,action:PayloadAction<{uid:string, businessId:string}>) => {
            state.loading = false;
            state.error = null;
        },
        fetchListedFollowedBusinessesSuccess: (state, action: PayloadAction<Business[]>) => {
            state.businesses = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchListedFollowedBusinessesFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the slice actions
export const { fetchListedFollowedBusinessesStart, reFetchListedFollowedBusinessesStart,deleteFollowedBusiness, fetchListedFollowedBusinessesSuccess, fetchListedFollowedBusinessesFailure } = listedFollowedBusinessesSlice.actions;

// Export the slice reducer
export default listedFollowedBusinessesSlice.reducer;
