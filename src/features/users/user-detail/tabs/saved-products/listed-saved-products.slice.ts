import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from "../../../../../shared/models";
import {ErrorResult} from "../../../../debug/debug.slice";


// Define the initial state
interface ListedProductState {
    products: Product[];
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: ListedProductState = {
    products: [],
    loading: false,
    error: null
};

// Create the slice
export const listedSavedProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchListedProductsStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = true;
            state.error = null;
        },
        reFetchListedProductsStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = false;
            state.error = null;
        },
        deleteProduct: (state,action:PayloadAction<{uid:string, productId:string}>) => {
            state.loading = false;
            state.error = null;
        },
        fetchListedProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchListedProductsFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the slice actions
export const { fetchListedProductsStart, reFetchListedProductsStart,deleteProduct, fetchListedProductsSuccess, fetchListedProductsFailure } = listedSavedProductSlice.actions;

// Export the slice reducer
export default listedSavedProductSlice.reducer;
