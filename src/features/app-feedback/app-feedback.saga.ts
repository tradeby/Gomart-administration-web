import { put, takeLatest } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import {getFeedbacksFailure, getFeedbacksStart, getFeedbacksSuccess} from "./app-feedback.slice";
import {db} from "../../shared/firebase/firestore";
import {Feedback, User} from "../../shared/models";
import { getAuth } from "firebase/auth";
import {ErrorResult} from "../debug/debug.slice"; // import your Firebase configuration

function* getFeedbacks():any {
    try {
        console.log("=========== GETTING DATA");
        const querySnapshot = yield getDocs(collection(db, 'APP_FEEDBACK')); // Replace 'Users' with your Firestore collection name
        const app_feedbacks: Feedback[] = querySnapshot.docs.map((doc: { data: () => Feedback; }) => doc.data() as Feedback);
        console.log(app_feedbacks);
        yield put(getFeedbacksSuccess(app_feedbacks));
    } catch (error) {
        const err0r = error as { message:string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(getFeedbacksFailure(errorResult));
    }
}

export function* watchGetFeedbacks() {
    yield takeLatest(getFeedbacksStart, getFeedbacks);
}
