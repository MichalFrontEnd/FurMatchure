import React from "react";
import ReactDOM from "react-dom";
//import { Redirect } from "react-router";
//import Test from "./test_app";
import Lager from "./lager";
import Canvas from "./app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

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

//

//// first we need to create a stage
//var stage = new Konva.Stage({
//    container: "container", // id of container <div>
//    width: 500,
//    height: 500,
//});

//// then create layer
//var layer = new Konva.Layer();

//// create our shape
//var circle = new Konva.Circle({
//    x: stage.width() / 2,
//    y: stage.height() / 2,
//    radius: 70,
//    fill: "red",
//    stroke: "black",
//    strokeWidth: 4,
//});

//// add the shape to the layer
//layer.add(circle);

//// add the layer to the stage
//stage.add(layer);

//// draw the image
//layer.draw();
