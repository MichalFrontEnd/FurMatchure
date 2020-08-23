import React, { useEffect, useState, useRef, Fragment } from "react";
import Konva from "konva";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";

export default function TextForm(props) {
    const { selectedImage } = props;

    //function textInfo() {
    //    //selectedImage.map((img, i) => {
    //    //    return {
    //    //        name: img.name,
    //    //        color: img.fill,
    //    //    };
    //    //});
    //    for (let i = 0; i < selectedImage.length; i++) {
    //        //console.log("i: ", selectedImage[i]);
    //        //console.log("i.name: ", selectedImage[i].image.name);
    //        //console.log("i.fill: ", selectedImage[i].fill);
    //        //console.log("i.pattern: ", selectedImage[i].fillPatternImage.name);
    //        //console.log("i.fill: ", selectedImage[i].image.fill);
    //        let info = {
    //            name: selectedImage[i].image.name,
    //        };
    //        if (selectedImage[i].fill) {
    //            info = { ...info, fill: selectedImage[i].fill };
    //        }
    //        if (selectedImage[i].fillPatternImage) {
    //            info = {
    //                ...info,
    //                pattern: selectedImage[i].fillPatternImage.name,
    //            };
    //        }
    //        console.log("info: ", info);
    //        setText({ ...text, info });
    //    }
    //}

    //textInfo();
    return (
        <Fragment>
            {selectedImage &&
                selectedImage.map((img, i) => {
                    return (
                        <Layer key={i}>
                            <Text
                                text="sanity check"
                                fontSize={15}
                                fill="blue"
                            ></Text>
                        </Layer>
                    );
                })}
        </Fragment>
    );
}
