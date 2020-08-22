import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getLager } from "./actions";
import Patterns from "./patterns";
import Uploader from "./uploader";

import { SwatchesPicker } from "react-color";

//import Konva from "konva";

export default function Canvas() {
    //I set it to an array so the user could choose multiple pieces of furniture
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const scaleRef = useRef(null);
    const dispatch = useDispatch();
    const trRef = useRef(null);
    const [isSelected, setIsSelected] = useState(null);
    //const [toggleTransformer, setToggleTransformer] = useState(false);
    const [colour, setColour] = useState("#fff");
    const [menuVis, setMenuVis] = useState(true);
    const [patternBg, setPatternBg] = useState(null);

    let updateImage;
    let newImageState;
    let stateCopy = [...selectedImage];

    useEffect(() => {
        dispatch(getLager());

        //loadImage(url);
    }, []);

    //useEffect(() => {
    //    console.log("selectedImage inside UE: ", selectedImage);
    //}, [selectedImage]);
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
                    patternImg: null,
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
        setPatternBg(e.target);
        selectedImage[isSelected];

        newImageState = selectedImage.map((img, idx) => {
            //console.log("idx: ", idx);
            if (idx == isSelected) {
                return {
                    ...img,
                    fill: null,
                    patternImg: patternBg,
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

    //console.log("selectedImage AFTER button click: ", selectedImage);

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
                            <Layer className="newlayer" key={i}>
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
                                    fillPatternImage={patternBg}
                                />
                                {i == isSelected && (
                                    <Transformer ref={trRef} key={i} />
                                )}
                            </Layer>
                        );
                    })}
            </Stage>
            {/*{menuVis && (*/}
            <div className="edit_menu">
                {/*<h1>menu Sanity check!</h1>*/}
                <SwatchesPicker
                    className="swatches"
                    onChange={pickColour}
                    colour={colour}
                />
                <div className="pattern_menu">
                    <h3>Choose a pattern:</h3>
                    <Patterns
                        pickPattern={(e) => {
                            pickPattern(e);
                        }}
                    />
                    <h3>Or upload your own pattern:</h3>
                    <Uploader />
                </div>

                <div className="ordering">
                    <h3>Ordering</h3>
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
            {/*)}*/}
        </div>
    );
}
