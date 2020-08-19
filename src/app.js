import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getLager } from "./actions";

//import Konva from "konva";

export default function Canvas() {
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const dispatch = useDispatch();

    //const [image] = useImage(null);
    const url =
        "https://images.unsplash.com/photo-1597676345712-ba4536073513?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80";

    //const [image, status] = useImage(url, "Anonymous");

    useEffect(() => {
        dispatch(getLager());
        //loadImage(url);
    }, []);

    const lager = useSelector((state) => state.lager);
    //console.log("can I see lager from canvas comp?: ", lager);

    function loadImage(src) {
        const img = new window.Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        imageRef.current = img;
        imageRef.current.addEventListener("load", handleLoad);
    }

    function handleLoad() {
        setSelectedImage((selectedImage) => [
            ...selectedImage,
            imageRef.current,
        ]);
    }

    function getImage(e) {
        console.log("this image was clicked:", e.target.name, e.target.id);
        loadImage(e.target.src);
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
                                <Image x={0} y={0} image={img} draggable />
                            </Layer>
                        );
                    })}
            </Stage>
        </div>
    );
}
