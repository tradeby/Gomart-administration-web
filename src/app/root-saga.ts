import {call, put, takeEvery, takeLatest, fork,all} from 'redux-saga/effects'
import {debugSaga} from "../features/debug/debug.saga";
import loginSaga from "../features/authentication/login/login.saga";


export function* rootSaga() {
    yield all([
        fork(debugSaga),
        fork(loginSaga),
        //fork(studentsListSaga),

    ])
}
