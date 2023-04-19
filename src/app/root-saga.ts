import {call, put, takeEvery, takeLatest, fork,all} from 'redux-saga/effects'
import {debugSaga} from "../features/debug/debug.saga";
import loginSaga from "../features/authentication/login/login.saga";
import {watchGetUsers} from "../features/users/users-list.saga";
import {watchLoadUser} from "../features/users/user-detail/user-detail.saga";


export function* rootSaga() {
    yield all([
        fork(debugSaga),
        fork(loginSaga),
        fork(watchGetUsers),
        fork(watchLoadUser),
        //fork(studentsListSaga),

    ])
}
