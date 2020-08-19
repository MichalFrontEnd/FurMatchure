import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getLager } from "./actions";

//import Konva from "konva";

export default function Canvas() {
    //i set it to an array so the user could choose multiple pieces of furniture
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLager());
        //loadImage(url);
    }, []);

    const lager = useSelector((state) => state.lager);
    const text = new Konva.Text({
        x: 10,
        y: 10,
        fontFamily: "Calibri",
        fontSize: 24,
        text: "",
        fill: "black",
    });

    function writeMessage(message) {
        text.text(message);
    }

    function loadImage(src) {
        const img = new window.Image();
        //img.x = 0;
        //img.y = 0;
        img.src = src;
        img.crossOrigin = "Anonymous";
        imageRef.current = img;
        imageRef.current.addEventListener("load", handleLoad);
        console.log("img: ", img);
    }

    function handleLoad() {
        setSelectedImage((selectedImage) => [
            ...selectedImage,
            { image: imageRef.current, x: 0, y: 0 },
        ]);
        //console.log("imageRef: ", imageRef);
    }

    function getImage(e) {
        console.log("this image was clicked:", e.target.name, e.target.id);
        loadImage(e.target.src);
    }

    function updatePosition(i, e) {
        let lastPos = e.target._lastPos;
        console.log("i: ", i);

        let currX = lastPos.x;
        let currY = lastPos.y;

        let updateImagePos = selectedImage[i];
        console.log("updateImagePos: ", updateImagePos);
        updateImagePos.x = currX;
        updateImagePos.y = currY;
        console.log("updateImagePos after,...: ", updateImagePos);

        let newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return updateImagePos;
            } else {
                return img;
            }
        });

        setSelectedImage(newImageState);
        //console.log("imageRef in updatePOSITION: ", imageRef);
        console.log("newImageState after mapping: ", newImageState);
        //console.log("selectedImage: ", selectedImage);

        console.log("currX, currY: ", currX, currY);
    }
    console.log("selectedImage: ", selectedImage);

    //console.log("image: ", image);

    return (
        <div id="test">
            <div className="lager">
                {lager &&
                    lager.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <img
                                    className="item_img"
                                    src={item.path}
                                    name={item.name}
                                    id={item.id}
                                    onClick={(e) => getImage(e)}
                                />
                            </div>
                        );
                    })}
            </div>

            <Stage className="canvas" width={innerWidth} height={innerHeight}>
                <Layer>
                    <Text
                        text="Click on an image to load it on the canvas!"
                        fontSize={26}
                    />
                </Layer>
                {selectedImage &&
                    selectedImage.map((img, i) => {
                        return (
                            <Layer className="newlayer" key={i}>
                                <Image
                                    x={img.x}
                                    y={img.y}
                                    image={img.image}
                                    draggable
                                    onDragEnd={(e) => {
                                        updatePosition(i, e);
                                    }}
                                />
                            </Layer>
                        );
                    })}
            </Stage>
        </div>
    );
}
