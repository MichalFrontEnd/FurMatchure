import React, { useEffect, useState } from "react";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import Konva from "konva";

export default function FormButtons(props) {
    const { stageRef, patternBg, textInfo } = props;
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function saveCanvas() {
        //console.log("stageRef: ", stageRef.current.toDataURL());
        var dataURL = stageRef.current.toDataURL();

        console.log("dataURL: ", dataURL);
        downloadURI(dataURL, "stage.png");
    }
    return (
        <div className="form_buttons">
            {!patternBg && <button onClick={saveCanvas}>💾</button>}
            {/*<button onClick={textInfo}>form</button>*/}
        </div>
    );
}
