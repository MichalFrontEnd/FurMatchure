import React, { useEffect } from "react";
import Konva from "konva";
console.log("Konva: ", Konva);

export default function Test() {
    useEffect(() => {
        var stage = new Konva.Stage({
            container: "container", //id of container <div>
            width: 500,
            height: 500,
        });

        var layer = new Konva.Layer();

        var circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
        });
        layer.add(circle);

        var tr = new Konva.Transformer();
        layer.add(tr);

        tr.nodes([circle]);
        stage.add(layer);

        layer.draw();
    });

    return (
        <div id="container">
            <h1>sanity check</h1>
        </div>
    );
}
