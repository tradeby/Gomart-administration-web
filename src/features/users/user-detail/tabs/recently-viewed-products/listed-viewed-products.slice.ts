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
export const listedViewedProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchListedViewedProductsStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = true;
            state.error = null;
        },
        reFetchListedViewedProductsStart: (state,action:PayloadAction<{uid:string}>) => {
            state.loading = false;
            state.error = null;
        },
        deleteViewedProduct: (state,action:PayloadAction<{uid:string, productId:string}>) => {
            state.loading = false;
            state.error = null;
        },
        fetchListedViewedProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchListedViewedProductsFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the slice actions
export const { fetchListedViewedProductsStart, reFetchListedViewedProductsStart,deleteViewedProduct, fetchListedViewedProductsSuccess, fetchListedViewedProductsFailure } = listedViewedProductSlice.actions;

// Export the slice reducer
export default listedViewedProductSlice.reducer;
