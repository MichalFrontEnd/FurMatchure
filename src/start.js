import React from "react";
import ReactDOM from "react-dom";
import Canvas from "./app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import * as io from "socket.io-client";

const socket = io.connect();
export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

function MixnMatch() {
    return (
        <Provider store={store}>
            <Canvas />
        </Provider>
    );
}
ReactDOM.render(<MixnMatch />, document.querySelector("main"));
