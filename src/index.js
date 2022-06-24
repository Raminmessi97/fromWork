import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import App2 from "./App2";

const container = document.getElementById('root');
const root = createRoot(container);



root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path='home' element={<App/>} />
                    <Route  path="partner" index element={<App2/>} />
                    {/* <Route  path="user" index element={<App3/>} /> */}

                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
