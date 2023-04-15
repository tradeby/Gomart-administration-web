import {call, debounce, delay, put, select, takeLatest} from "redux-saga/effects";
import {attemptLogin, loginFailure, loginSuccess} from "./login.slice";
import {ErrorResult} from "../../debug/debug.slice";
import {auth} from "../../../shared/firebase/firestore";
import {AuthError} from "@firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";

// Firebase authentication function
const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user; // Return user object upon successful sign-in
    } catch (error:any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(`Error signing in: ${errorCode} - ${errorMessage}`); // Throw error with code and message
    }

};

// Saga worker function for signing in user
function* signInUserSaga(action: any):any {
    try {
        const {email, password} = action.payload;

        const userResult = yield call(loginWithEmailAndPassword, email, password);
       // console.log(user);
        yield put(loginSuccess({user:userResult}));

    } catch (err) {
        //yield error result here
        const err0r: AuthError = err as AuthError;
        console.log("gomartcatch",err);
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(loginFailure({error: errorResult}));
    }
}

// Saga watcher function
export function* loginSaga() {
    yield takeLatest(attemptLogin, signInUserSaga);
}

export default loginSaga;
