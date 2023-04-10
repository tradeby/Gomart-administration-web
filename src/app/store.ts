import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
import authenticationReducer from "../features/authentication/authentication-slice";
import debugReducer from "../features/debug/debug.slice";


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        //studentsList: studentsListReducer,
        authentication: authenticationReducer,
        debugSlice: debugReducer,
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
