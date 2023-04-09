import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        //studentsList: studentsListReducer,
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
