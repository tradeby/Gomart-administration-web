import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
import authenticationReducer from "../features/authentication/authentication-slice";
import debugReducer from "../features/debug/debug.slice";
import loginReducer from '../features/authentication/login/login.slice'
import userDetailReducer from '../features/users/user-detail/user-detail.slice';
import usersListReducer from '../features/users/users-list.slice';
import businessListReducer from '../features/businesses/business.slice';
import businessDetailReducer from '../features/businesses/business-detail/business-detail.slice';
import listedProductsReducer from '../features/businesses/business-detail/tabs/listed-products/listed-products.slice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        login: loginReducer,
        debugSlice: debugReducer,
        usersSlice: usersListReducer,
        userDetailSlice: userDetailReducer,
        businessesSlice: businessListReducer,
        businessDetailSlice: businessDetailReducer,
        listedProductsSlice: listedProductsReducer
    },
    middleware: [sagaMiddleware
    ],


});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
