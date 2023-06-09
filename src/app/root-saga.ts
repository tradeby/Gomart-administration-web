import {call, put, takeEvery, takeLatest, fork,all} from 'redux-saga/effects'
import {debugSaga} from "../features/debug/debug.saga";
import loginSaga from "../features/authentication/login/login.saga";
import {watchGetUsers} from "../features/users/users-list.saga";
import {watchLoadUser} from "../features/users/user-detail/user-detail.saga";
import businessesSaga from "../features/businesses/business.saga";
import businessDetailSaga from "../features/businesses/business-detail/business-detail.saga";
import listedProductSaga from "../features/businesses/business-detail/tabs/listed-products/listed-products.saga";
import {productSaga} from "../features/businesses/business-detail/tabs/listed-products/product-detail/product.saga";
import {
    watchUpdateBusinessRequest
} from "../features/businesses/business-detail/tabs/business-information/update-business.saga";


export function* rootSaga() {
    yield all([
        fork(debugSaga),
        fork(loginSaga),
        fork(watchGetUsers),
        fork(watchLoadUser),
        fork(businessesSaga),
        fork(businessDetailSaga),
        fork(listedProductSaga),
        fork(productSaga),
        fork(watchUpdateBusinessRequest),
        //fork(studentsListSaga),

    ])
}
