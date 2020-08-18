import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Text } from "react-konva";
import Lager from "./lager";
import { useDispatch, useSelector } from "react-redux";
import { getLager } from "./actions";

//import Konva from "konva";

export default function Canvas() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLager());
    }, []);
    const lager = useSelector((state) => state.lager);
    console.log("can I see lager from canvas comp?: ", lager);
    return (
        <div id="test">
            <div className="lager">
                {lager &&
                    lager.map((item, i) => {
                        return (
                            <div
                                className="item"
                                key={i}
                                name={item.name}
                                id={item.id}
                            >
                                <img className="item_img" src={item.path} />
                            </div>
                        );
                    })}
            </div>
            <Stage className="canvas">
                <Layer>
                    <Text text="sanity check"></Text>
                </Layer>
            </Stage>
        </div>
    );
}
