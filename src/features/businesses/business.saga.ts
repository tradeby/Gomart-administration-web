import {put, call, takeLatest} from 'redux-saga/effects';
import {loadBusinessesFailure, loadBusinessesStart, loadBusinessesSuccess} from "./business.slice";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../shared/firebase/firestore";
import {Business, User} from "../../shared/models";
import {ErrorResult} from "../debug/debug.slice";


// Define the saga worker function
function* loadBusinessesSaga(): any {
    try {
        const querySnapshot = yield getDocs(collection(db, 'BUSINESSES')); // Replace 'Users' with your Firestore collection name
        const businesses: Business[] = querySnapshot.docs.map((doc: { data: () => Business; id: string }) => {
            return {...doc.data(), id: doc.id};

        }); // Extract businesses data from snapshot
        yield put(loadBusinessesSuccess(businesses)); // Dispatch "loadBusinessesSuccess" action with loaded businesses
    } catch (error) {
        const err0r = error as { message: string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(loadBusinessesFailure(errorResult)); // Dispatch "loadBusinessesFailure" action with error message
    }
}

// Define the saga watcher function
function* businessesSaga() {
    yield takeLatest(loadBusinessesStart.type, loadBusinessesSaga); // Watch for "loadBusinessesStart" action and run the saga worker
}

export default businessesSaga;
