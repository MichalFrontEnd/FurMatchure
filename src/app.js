import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import Patterns from "./patterns";
import Uploader from "./uploader";
import Lager from "./lager";

import { SwatchesPicker } from "react-color";

//import Konva from "konva";

export default function Canvas() {
    //I set it to an array so the user could choose multiple pieces of furniture
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const scaleRef = useRef(null);
    const containerRef = useRef(null);
    const trRef = useRef(null);
    const [isSelected, setIsSelected] = useState(null);
    //const [toggleTransformer, setToggleTransformer] = useState(false);
    const [colour, setColour] = useState("#fff");
    const [menuVis, setMenuVis] = useState(false);
    const [patternBg, setPatternBg] = useState(null);
    const [stageHeight, setStageHeight] = useState(600);
    const [stageWidth, setStageWidth] = useState(1000);
    const [containerWidth, setContainerWidth] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);

    let updateImage;
    let newImageState;
    let stateCopy = [...selectedImage];

    useEffect(() => {
        setContainerHeight(containerRef.current.clientHeight);
        setContainerWidth(containerRef.current.clientWidth);
        //console.log("containerRef: ", containerRef.current.clientHeight);

        //loadImage(url);
    }, [containerWidth]);
    useEffect(() => {
        responsiveStage();
    }, [stageWidth]);

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
                fillPatternImage: null,
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
        //originally updated x and y as well. It made it jump..
        //still jumps on "release"...
        //updateImage.x = node.x;
        //updateImage.y = node.y;
        node.image.height = node.image.height * node.scaleY;
        node.image.width = node.image.width * node.scaleX;
        //updateImage.fill = "blue";
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

    function editImg(i, e) {
        //console.log("i: ", i);
        e.cancelBubble = true;
        setIsSelected(i);
        //Can't get toggle to work yet. tried isSelected >= 0 +/ !, typeOf e.currentTarget, i >= 0 / !i
        //setting it to Stage clickhandler solved it
        if (i >= 0) {
            setMenuVis(true);
        }
        //console.log("e.target==e.target.getImage(): ", e.target == Image());
        //setToggleTransformer(true);
        //const clickedOnEmpty = e.target === e.target.getStage();
        //if (clickedOnEmpty) {
        //    //setIsSelected(null);
        //}
        //console.log("trRef: ", trRef);

        updateImage = selectedImage[i];
        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return { ...updateImage, transformerVis: true };
            } else {
                return { ...img, transformerVis: false };
            }
        });
        //console.log("trRef.current.node: ", trRef.current.nodes);
        //console.log("scaleRef.current: ", scaleRef.current);
        //console.log("e.currentTarget: ", e.currentTarget);
        //console.log("newImageState: ", newImageState);
        setSelectedImage(newImageState);
        trRef.current.nodes([e.currentTarget]);
        trRef.current.getLayer().batchDraw();
    }
    //console.log("toggleTransformer: ", toggleTransformer);
    //console.log("updateImage: ", updateImage);
    //console.log("selectedImage: ", selectedImage);
    //console.log("isSelected: ", isSelected);
    //console.log("patternBg: ", patternBg);
    //console.log("menuVis: ", menuVis);

    function pickColour(colour) {
        //console.log("something");
        //console.log("colour: ", colour);
        setColour(colour.hex);
        selectedImage[isSelected];
        //updateImage = isSelected;

        newImageState = selectedImage.map((img, idx) => {
            //console.log("idx: ", idx);
            if (idx == isSelected) {
                return {
                    ...img,
                    fill: colour.hex,
                    //patternImg: null,
                };
            } else {
                return img;
            }
        });
        setSelectedImage(newImageState);

        //console.log("colour: ", colour);
    }
    function pickPattern(e) {
        setMenuVis(true);

        selectedImage[isSelected];

        newImageState = selectedImage.map((img, idx) => {
            //console.log("idx: ", idx);
            console.log("idx: ", idx === isSelected);
            if (idx == isSelected) {
                setPatternBg(e.target);
                return {
                    ...img,
                    fill: null,
                    fillPatternImage: patternBg,
                };
            } else {
                return img;
            }
        });
        setSelectedImage(newImageState);
    }

    function removeItem() {
        stateCopy.splice(isSelected, 1);
        setSelectedImage(stateCopy);
    }

    function changeOrder(e) {
        const button = e.currentTarget.name;
        //console.log("button: ", button);
        const item = stateCopy.splice(isSelected, 1);

        //console.log("item: ", item[0]);

        if (button === "movebottom") {
            stateCopy.unshift(item[0]);
            setSelectedImage(stateCopy);
        } else if (button === "movetop") {
            stateCopy.push(item[0]);
            setSelectedImage(stateCopy);
        } else if (button === "moveup") {
            stateCopy.splice(isSelected + 1, 0, item[0]);
            setSelectedImage(stateCopy);
        } else if (button === "movedown") {
            stateCopy.splice(isSelected - 1, 0, item[0]);
            setSelectedImage(stateCopy);
        }
    }

    function responsiveStage() {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        const scaleX = containerWidth / stageWidth;
        const scaleY = containerHeight / stageHeight;
        //console.log("containerWidth: ", containerWidth);
        //console.log("containerHeight: ", containerHeight);
        //console.log("CanvasWidth: ", stageWidth);
        //console.log("CanvasWidth: ", stageHeight);
        //console.log("scale: ", scale);
        setStageWidth(stageWidth * scaleX);
        setStageHeight(stageHeight * scaleY);
    }
    //console.log("selectedImage AFTER button click: ", selectedImage);

    return (
        <div className="container">
            <Lager getImage={getImage} />
            <div className="canvas_container" ref={containerRef}>
                <Stage
                    //className="canvas"
                    width={stageWidth}
                    height={stageHeight}
                    onClick={() => {
                        {
                            setIsSelected(null), setMenuVis(false);
                        }
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
                                <Layer key={i}>
                                    <Image
                                        onClick={(e) => {
                                            editImg(i, e);
                                        }}
                                        x={img.x}
                                        y={img.y}
                                        image={img.image}
                                        name={img.name}
                                        id={img.id}
                                        fill={img.fill}
                                        draggable
                                        onDragEnd={(e) => {
                                            updatePosition(i, e);
                                        }}
                                        ref={scaleRef}
                                        onTransform={(e) => {
                                            updateSize(i, e);
                                        }}
                                        isSelected={i === isSelected}
                                        onSelect={() => {
                                            setIsSelected(i);
                                        }}
                                        fillPatternImage={img.fillPatternImage}
                                    />
                                    {i == isSelected && (
                                        <Transformer ref={trRef} key={i} />
                                    )}
                                </Layer>
                            );
                        })}
                </Stage>
            </div>
            <div className="fill_menu">
                {/*<h1>menu Sanity check!</h1>*/}
                <h3 className="menu_header">choose a fill color:</h3>
                <SwatchesPicker
                    className="swatches"
                    onChange={pickColour}
                    colour={colour}
                />

                <h3 className="menu_header">
                    Or <br></br>choose a pattern:
                </h3>
                <Patterns
                    pickPattern={(e) => {
                        pickPattern(e);
                    }}
                />
                <h3 className="menu_header">
                    Or<br></br> upload your own pattern!
                </h3>
                <Uploader />
            </div>
            {menuVis && (
                <div className="toolkit">
                    <div className="ordering">
                        <h3>Change Ordering</h3>
                        <button onClick={changeOrder} name="moveup">
                            Move Up
                        </button>
                        <button onClick={changeOrder} name="movedown">
                            Move Down
                        </button>
                        <button onClick={changeOrder} name="movetop">
                            Move To Top
                        </button>
                        <button onClick={changeOrder} name="movebottom">
                            Move To Bottom
                        </button>
                    </div>
                    <button onClick={removeItem}>Remove Item</button>
                </div>
            )}
        </div>
    );
}
