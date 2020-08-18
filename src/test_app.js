import React, { useEffect } from "react";
import Konva from "konva";
console.log("Konva: ", Konva);

export default function Test() {
    useEffect(() => {
        var stage = new Konva.Stage({
            container: "container", //id of container <div>
            width: 800,
            height: 800,
        });

        var layer = new Konva.Layer({});

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

        var text = new Konva.Text({
            x: 10,
            y: 10,
            fontFamily: "Calibri",
            fontSize: 24,
            text: "",
            fill: "black",
        });

        function writeMessage(message) {
            text.text(message);
            layer.draw();
        }

        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.nodes([]);

        function makeScalable(elem) {
            tr.nodes([elem]);
        }

        circle.on("mousedown", function (e) {
            console.log("mousedown on circle");
            writeMessage("Mousedown circle");
            var mousePos = stage.getPointerPosition();
            var x = Math.floor(mousePos.x);
            var y = Math.floor(mousePos.y);
            writeMessage("x: " + x + ", y: " + y);
            //tr.forceUpdate({ visible: true });
            //tr.visible = !tr.visible;
            //layer.add(tr);
            makeScalable(e.target);
            layer.draw();
        });

        layer.add(text);
        stage.add(layer);

        layer.draw();
    });

    return (
        <div id="test">
            <div id="container">
                <h1>sanity check</h1>
            </div>
            <div id="img_container">
                <h1>sanity check</h1>
                <img src="/images/1seater.png" id="1seater" />
            </div>
        </div>
    );
}
