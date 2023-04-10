import {call, put, takeEvery, takeLatest, fork,all} from 'redux-saga/effects'
import {debugSaga} from "../features/debug/debug.saga";


export function* rootSaga() {
    yield all([
        fork(debugSaga),
        //fork(studentsListSaga),

    ])
}
