import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";


const container = document.getElementById('root')! || document.createElement('div');

//export const serverUrl = process.env.REACT_APP_SERVER_URL;
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
