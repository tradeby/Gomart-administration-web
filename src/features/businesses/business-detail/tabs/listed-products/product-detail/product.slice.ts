// productSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product} from "../../../../../../shared/models";
import {ErrorResult} from "../../../../../debug/debug.slice";



interface ProductState {
    product: Product | null;
    saving: boolean;
    error: ErrorResult | null;
}

const initialState: ProductState = {
    product: null,
    saving: false,
    error: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        /*getProductStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getProductSuccess: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProductFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
        },*/
        saveProductStart: (state, action:PayloadAction<{product:Product}>) => {
            state.saving = true;
            state.error = null;
        },
        saveProductSuccess: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
            state.saving = false;
            state.error = null;
        },
        saveProductFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.saving = false;
            state.error = action.payload;
        },
    },
});

export const {
   /* getProductStart,
    getProductSuccess,
    getProductFailure,*/
    saveProductStart,
    saveProductSuccess,
    saveProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
