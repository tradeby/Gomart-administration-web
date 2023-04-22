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
export const listedProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchListedProductsStart: (state,action:PayloadAction<{businessId:string}>) => {
            state.loading = true;
            state.error = null;
        },
        reFetchListedProductsStart: (state,action:PayloadAction<{businessId:string}>) => {
            state.loading = false;
            state.error = null;
        },
        deleteProduct: (state,action:PayloadAction<{businessId:string, productId:string}>) => {
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
export const { fetchListedProductsStart, reFetchListedProductsStart,deleteProduct, fetchListedProductsSuccess, fetchListedProductsFailure } = listedProductSlice.actions;

// Export the slice reducer
export default listedProductSlice.reducer;
