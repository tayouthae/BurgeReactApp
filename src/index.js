import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import orderReduer from "./store/reducers/order";

const rootReducer = combineReducers({
    order: orderReduer,
    burgerBuilder: burgerBuilderReducer,
    auth: authReducer,
});

let composeEnhancers = null;
if (process.env.NODE_ENV === "development") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
ReactDOM.render( <
    Provider store = { store } >
    <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter> < /
    Provider > ,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();