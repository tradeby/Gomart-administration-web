import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FLAG_TYPE = 'ERROR' | 'SUCCESS';

interface FlagState {
    flagId: number;
    flagContent?: {
        title: string,
        description?: string,
        flagType: FLAG_TYPE;
    }
}

const initialState: FlagState = {
    flagId: 0
}
export const flagSlice = createSlice({
        name: 'globalFlagSlice',
        initialState,
        reducers: {
            onShowFlag: (state, prop: PayloadAction<{
                title: string,
                description?: string,
                flagType: FLAG_TYPE;
            }>): FlagState => {
                return {
                    flagId: state.flagId + 1,
                    flagContent: prop.payload
                };
            },
            onHideAllFlags: (state): FlagState => {
                return {flagId: state.flagId + 1};

            }
        },

    })
;

export const {onShowFlag, onHideAllFlags} = flagSlice.actions;
export default flagSlice.reducer;
