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
    const [isSelected, setIsSelected] = useState(null);
    const [toggleTransformer, setToggleTransformer] = useState(false);

    let updateImage;
    let newImageState;

    useEffect(() => {
        dispatch(getLager());

        //loadImage(url);
    }, []);
    console.log("isSelected:", isSelected);
    const lager = useSelector((state) => state.lager);

    function loadImage(src, name, id) {
        const img = new window.Image();
        img.src = src;
        img.name = name;
        img.id = id;
        img.crossOrigin = "Anonymous";
        imageRef.current = img;
        imageRef.current.addEventListener("load", handleLoad);
        //console.log("img: ", img);
    }

    function handleLoad() {
        setSelectedImage((selectedImage) => [
            ...selectedImage,
            {
                image: imageRef.current,
                x: 0,
                y: 0,
                width: this.width,
                height: this.height,
                transformerVis: false,
                fill: "white",
            },
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
    //console.log("selectedImage: ", selectedImage);

    //const checkDeselect = (e) => {
    //    // deselect when clicked on empty area
    //    console.log("e.target:", e.target);
    //    const clickedOnEmpty = e.target === e.target.getStage();
    //    if (clickedOnEmpty) {
    //        setIsSelected(null);
    //    }
    //};

    function updateSize(i, e) {
        const node = e.target.attrs;

        updateImage = selectedImage[i];

        updateImage.x = node.x;
        updateImage.y = node.y;
        node.image.height = node.image.height * node.scaleY;
        node.image.width = node.image.width * node.scaleX;
        updateImage.fill = "blue";
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

    function imgTransform(i, id, e) {
        console.log("i: ", i);
        e.cancelBubble = true;
        setIsSelected(id);

        //console.log("e.target==e.target.getImage(): ", e.target == Image());
        setToggleTransformer(true);
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            //setIsSelected(null);
        }
        //console.log("trRef: ", trRef);

        updateImage = selectedImage[i];
        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return { ...updateImage, transformerVis: true };
            } else {
                return { ...img, transformerVis: false };
            }
        });
        console.log("newImageState: ", newImageState);
        setSelectedImage(newImageState);
        trRef.current.node(scaleRef.current);
        trRef.current.getLayer().batchDraw();

        //if (isSelected) {
        //    console.log("something");
        //    //console.log("i: ", i);
        //}
    }
    //console.log("toggleTransformer: ", toggleTransformer);
    //console.log("updateImage: ", updateImage);
    console.log("selectedImage: ", selectedImage);
    console.log("isSelected: ", isSelected);
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
                width={parent.innerWidth}
                height={parent.innerHeight}
                onClick={() => {
                    setIsSelected(null);
                }}
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
                                    onClick={(e) => {
                                        imgTransform(i, img.image.id, e);
                                    }}
                                    x={img.x}
                                    y={img.y}
                                    image={img.image}
                                    name={img.name}
                                    id={img.image.id}
                                    //fill={img.fill}
                                    draggable
                                    onDragEnd={(e) => {
                                        updatePosition(i, e);
                                    }}
                                    ref={scaleRef}
                                    onTransformEnd={(e) => {
                                        updateSize(i, e);
                                    }}
                                    isSelected={img.image.id === isSelected}
                                    onSelect={() => {
                                        setIsSelected(img.image.id);
                                    }}
                                />
                                {img.image.id == isSelected && (
                                    <Transformer ref={trRef} key={i} />
                                )}
                            </Layer>
                        );
                    })}
            </Stage>
        </div>
    );
}
