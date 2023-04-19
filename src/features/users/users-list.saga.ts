import { put, takeLatest } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import {getUsersFailure, getUsersStart, getUsersSuccess} from "./users-list.slice";
import {db} from "../../shared/firebase/firestore";
import {User} from "../../shared/models";
import {AuthError} from "@firebase/auth";
import {ErrorResult} from "../debug/debug.slice"; // import your Firebase configuration

function* getUsers():any {
    try {
        const querySnapshot = yield getDocs(collection(db, 'USERS')); // Replace 'Users' with your Firestore collection name
        const users: User[] = querySnapshot.docs.map((doc: { data: () => User; }) => doc.data() as User);
        yield put(getUsersSuccess(users));
    } catch (error) {
        const err0r = error as { message:string };
        const errorResult: ErrorResult = {message: err0r.message, status: 500}
        yield put(getUsersFailure(errorResult));
    }
}

export function* watchGetUsers() {
    yield takeLatest(getUsersStart, getUsers);
}
