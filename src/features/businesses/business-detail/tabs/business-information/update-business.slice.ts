// src/features/business/businessSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Business} from "../../../../../shared/models";
import {ErrorResult} from "../../../../debug/debug.slice";

interface BusinessState {
    saving: boolean;
    error: ErrorResult | null;
}

const initialState: BusinessState = {
    saving: false,
    error: null,
};

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        updateBusinessRequest: (state, action: PayloadAction<{ business: Business, gallaryPhotos?: File[], logoFile?: File, coverPhotoFile?: File }>) => {
            state.saving = true;
            state.error = null;
        },
        updateBusinessSuccess: (state) => {
            state.saving = false;
            state.error = null;
        },
        updateBusinessFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.saving = false;
            state.error = action.payload;
        },
    },
});

export const {
    updateBusinessRequest,
    updateBusinessSuccess,
    updateBusinessFailure,
} = businessSlice.actions;

export default businessSlice.reducer;

