import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
import authenticationReducer from "../features/authentication/authentication-slice";
import debugReducer from "../features/debug/debug.slice";
import loginReducer from '../features/authentication/login/login.slice'
import userDetailReducer from '../features/users/user-detail/user-detail.slice';
import usersListReducer, {usersSlice} from '../features/users/users-list.slice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        //studentsList: studentsListReducer,
        authentication: authenticationReducer,
        login: loginReducer,
        debugSlice: debugReducer,
        usersSlice: usersListReducer,
        userDetailSlice: userDetailReducer,
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
