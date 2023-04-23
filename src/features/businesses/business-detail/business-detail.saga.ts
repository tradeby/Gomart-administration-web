import {put, call, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import {
    loadBusinessFailure,
    loadBusinessStart,
    loadBusinessSuccess,
    reLoadBusinessStart
} from "./business-detail.slice";
import {ErrorResult} from "../../debug/debug.slice";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../shared/firebase/firestore";


// Define the saga worker function
function* loadBusinessSaga(action: PayloadAction<{businessId:string}>): any {
    try {
        const businessId = action.payload.businessId; // Get the businessId from the action payload

        const businessRef = doc(db, 'BUSINESSES', businessId);

        const businessDoc = yield getDoc(businessRef);
        if (!businessDoc.exists) {
            const errorResult: ErrorResult = {message: 'Business not found', status: 500}
            yield put(loadBusinessFailure(errorResult));
        } else {
            const business = {id: businessDoc.id, ...businessDoc.data()};
            yield put(loadBusinessSuccess(business)); // Dispatch "loadBusinessSuccess" action with loaded business
        }
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(loadBusinessFailure(errorResult)); // Dispatch "loadBusinessFailure" action with error message
    }
}

// Define the saga watcher function
function* businessDetailSaga() {
    yield takeLatest(loadBusinessStart.type, loadBusinessSaga); // Watch for "loadBusinessStart" action and run the saga worker
    yield takeLatest(reLoadBusinessStart.type, loadBusinessSaga); // Watch for "loadBusinessStart" action and run the saga worker
}

export default businessDetailSaga;
