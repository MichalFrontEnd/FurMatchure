import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Image, Transformer } from "react-konva";
import Patterns from "./patterns";
import Uploader from "./uploader";
import Lager from "./lager";
import { SwatchesPicker } from "react-color";
import FormButtons from "./formbuttons";
import Welcome from "./welcome";

export default function Canvas() {
    const [selectedImage, setSelectedImage] = useState([]);
    const imageRef = useRef(null);
    const scaleRef = useRef(null);
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const trRef = useRef(null);
    const [isSelected, setIsSelected] = useState(null);
    const [colour, setColour] = useState("#fff");
    const [menuVis, setMenuVis] = useState(false);
    const [patternBg, setPatternBg] = useState(null);
    const [stageHeight, setStageHeight] = useState(600);
    const [stageWidth, setStageWidth] = useState(1000);
    const [containerWidth, setContainerWidth] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);
    const [welcomeVis, setWelcomeVis] = useState(true);

    let updateImage;
    let newImageState;
    let stateCopy = [...selectedImage];

    useEffect(() => {
        setContainerHeight(containerRef.current.clientHeight);
        setContainerWidth(containerRef.current.clientWidth);
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
        console.log("img: ", img);
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
        loadImage(e.target.src, e.target.name, e.target.id);
    }

    function updatePosition(i, e) {
        let pos = e.target.attrs;
        let currX = pos.x;
        let currY = pos.y;
        updateImage = selectedImage[i];
        updateImage.x = currX;
        updateImage.y = currY;

        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return updateImage;
            } else {
                return img;
            }
        });

        setSelectedImage(newImageState);
    }

    function updateSize(i, e) {
        const node = e.target.attrs;
        updateImage = selectedImage[i];
        node.image.height = node.image.height * node.scaleY;
        node.image.width = node.image.width * node.scaleX;

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
        e.cancelBubble = true;
        setIsSelected(i);
        if (i >= 0) {
            setMenuVis(true);
        }

        updateImage = selectedImage[i];
        newImageState = selectedImage.map((img, idx) => {
            if (idx == i) {
                return { ...updateImage, transformerVis: true };
            } else {
                return { ...img, transformerVis: false };
            }
        });
        setSelectedImage(newImageState);
        trRef.current.nodes([e.currentTarget]);
        trRef.current.getLayer().batchDraw();
    }

    function randomColour() {
        setColour(Konva.Util.getRandomColor());
        selectedImage[isSelected];
        newImageState = selectedImage.map((img, idx) => {
            if (idx == isSelected) {
                return {
                    ...img,
                    fill: colour,
                };
            } else {
                return img;
            }
        });
        setSelectedImage(newImageState);
    }
    function pickColour(colour) {
        selectedImage[isSelected];

        newImageState = selectedImage.map((img, idx) => {
            if (idx == isSelected) {
                setPatternBg(null);
                return {
                    ...img,
                    fill: colour.hex,
                    //fillPatternImage: null,
                };
            } else {
                return img;
            }
        });
        setSelectedImage(newImageState);
    }
    function pickPattern(e) {
        setMenuVis(true);

        selectedImage[isSelected];

        newImageState = selectedImage.map((img, idx) => {
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
        const item = stateCopy.splice(isSelected, 1);

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
        setStageWidth(stageWidth * scaleX);
        setStageHeight(stageHeight * scaleY);
    }

    function confirm() {
        setWelcomeVis(false);
    }
    return (
        <div className="container">
            {welcomeVis && <Welcome confirm={confirm} />}

            <Lager getImage={getImage} />
            <div className="canvas_container" ref={containerRef}>
                <Stage
                    ref={stageRef}
                    width={stageWidth}
                    height={stageHeight}
                    onClick={() => {
                        {
                            setIsSelected(null), setMenuVis(false);
                        }
                    }}
                >
                    <Layer></Layer>
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
                <h3 className="menu_header">choose a fill color:</h3>
                <SwatchesPicker
                    className="swatches"
                    onChange={pickColour}
                    colour={colour}
                />
                <button onClick={randomColour}>Random Colour</button>
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

                    <button id="remove" onClick={removeItem}>
                        Remove Item
                    </button>
                </div>
            )}
            <FormButtons stageRef={stageRef} patternBg={patternBg} />
        </div>
    );
}
