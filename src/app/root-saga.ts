import {call, put, takeEvery, takeLatest, fork,all} from 'redux-saga/effects'


export function* rootSaga() {
    yield all([
        //fork(studentsListSaga),

    ])
}
