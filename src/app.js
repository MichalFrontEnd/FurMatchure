import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getLager } from "./actions";

//import Konva from "konva";

export default function Canvas() {
    //i set it to an array so the user could choose multiple pieces of furniture
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const scaleRef = useRef(null);
    const dispatch = useDispatch();
    const trRef = useRef(null);
    let updateImage;
    let newImageState;

    useEffect(() => {
        dispatch(getLager());
        //loadImage(url);
    }, []);

    const lager = useSelector((state) => state.lager);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            toggleTransformer(null);
        }
    };

    function loadImage(src, name, id) {
        const img = new window.Image();
        img.src = src;
        img.name = name;
        img.id = id;
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
    }

    function getImage(e) {
        //console.log("this image was clicked:", e.target.name, e.target.id);
        loadImage(e.target.src, e.target.name, e.target.id);
    }

    function updatePosition(i, e) {
        let pos = e.target.attrs;
        let currX = pos.x;
        let currY = pos.y;
        updateImage = selectedImage[i];
        //console.log("updateImagePos: ", updateImagePos);
        updateImage.x = currX;
        updateImage.y = currY;
        //console.log("updateImagePos after,...: ", updateImagePos);

        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return updateImage;
            } else {
                return img;
            }
        });

        setSelectedImage(newImageState);
        //console.log("imageRef in updatePOSITION: ", imageRef);
        //console.log("newImageState after mapping: ", newImageState);
        //console.log("selectedImage: ", selectedImage);
    }
    console.log("selectedImage: ", selectedImage);

    function toggleTransformer(i, e) {
        console.log("scaleRef in toggleTransformer: ", scaleRef.current);
        //console.log("i: ", i);
        trRef.current.node(scaleRef.current);
        trRef.current.getLayer().batchDraw();
    }

    function updateSize(i, e) {
        const node = e.target.attrs;

        updateImage = selectedImage[i];

        updateImage.x = node.x;
        updateImage.y = node.y;
        node.image.height = node.image.height * node.scaleY;
        node.image.width = node.image.width * node.scaleX;
        //console.log("updateImagePos after,...: ", updateImagePos);

        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return updateImage;
            } else {
                return img;
            }
        });

        setSelectedImage(newImageState);
    }
    console.log("updateImage: ", updateImage);

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

            <Stage
                className="canvas"
                width={innerWidth}
                height={innerHeight}
                onMouseDown={checkDeselect}
            >
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
                                    name={img.name}
                                    id={img.id}
                                    draggable
                                    onDragEnd={(e) => {
                                        updatePosition(i, e);
                                    }}
                                    onClick={(e) => {
                                        toggleTransformer(i, e);
                                    }}
                                    ref={scaleRef}
                                    onTransformEnd={(e) => {
                                        updateSize(i, e);
                                    }}
                                />
                                {toggleTransformer && (
                                    <Transformer ref={trRef} />
                                )}
                            </Layer>
                        );
                    })}
            </Stage>
        </div>
    );
}
