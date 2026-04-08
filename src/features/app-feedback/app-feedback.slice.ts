import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Feedback} from "../../shared/models";
import {ErrorResult} from "../debug/debug.slice";

interface FeedbacksState {
    feedbacks: Feedback[];
    searchedFeedback: Feedback[]|null;
    searchTerm:string|null;
    loading: boolean;
    error: ErrorResult | null;
}

const initialState: FeedbacksState = {
    feedbacks: [],
    searchedFeedback:null,
    searchTerm:null,
    loading: false,
    error: null,
};

export const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        getFeedbacksStart: (state) => {
            state.loading = true;
            state.error = null;
            state.searchTerm = null;
            state.searchedFeedback = null;
        },
        getFeedbacksSuccess: (state, action: PayloadAction<Feedback[]>) => {
            state.loading = false;
            state.error = null;
            state.feedbacks = action.payload;
            state.searchTerm = null;
            state.searchedFeedback = null;
        },
        getFeedbacksFailure: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = action.payload;
            state.searchTerm = null;
            state.searchedFeedback = null;
        },
        searchFeedback: (state, action: PayloadAction<{searchTerm:string}>) => {
            state.searchTerm = action.payload.searchTerm;
            state.searchedFeedback = searchFeedbacks(action.payload.searchTerm, state.feedbacks);
        },
        clearSearch: (state, action: PayloadAction<ErrorResult>) => {
            state.loading = false;
            state.error = null;
            state.searchTerm = null;
            state.searchedFeedback = null;
        },
    },
});

export const { getFeedbacksStart, getFeedbacksSuccess, getFeedbacksFailure, searchFeedback, clearSearch } = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
const searchFeedbacks = (searchTerm: string, feedbacks: Feedback[]): Feedback[] => {
    searchTerm = searchTerm.toLowerCase();
    return feedbacks.filter(feedback => {
        const message = feedback?.message?.toLowerCase() || '';
        const submittedByUserId = feedback?.submittedByUserId?.toLowerCase() || '';


        return message.includes(searchTerm) ||
            submittedByUserId.includes(searchTerm);
    });
};
