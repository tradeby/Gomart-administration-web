import { takeLatest, call, put } from "redux-saga/effects";
import {db} from "../../../shared/firebase/firestore";
import {loadUserFailure, loadUserStart, loadUserSuccess} from "./user-detail.slice";
import {ErrorResult} from "../../debug/debug.slice";
import {collection, getDoc, doc} from "firebase/firestore";


// Define the Firestore collection and document path for the Users collection


// Define the saga worker function to handle the loadUserStart action
function* loadUserSaga(action: ReturnType<typeof loadUserStart>):any {
    try {
        const prop = action.payload.userId as string;
        const userRef = doc(db, 'USERS', prop);

        const userDoc = yield getDoc(userRef);
        if (!userDoc.exists) {
            const errorResult: ErrorResult = {message: 'User not found', status: 500}
            yield put(loadUserFailure(errorResult));
        }else{
            const user = { userId: userDoc.id, ...userDoc.data() };
            yield put(loadUserSuccess(user));
        }
        // Dispatch the loadUserSuccess action with the fetched user

    } catch (error) {
        const err0r = error as { message:string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(loadUserFailure(errorResult));
    }
}

// Define the saga watcher function to listen for the loadUserStart action
export function* watchLoadUser() {
    yield takeLatest(loadUserStart, loadUserSaga);
}
