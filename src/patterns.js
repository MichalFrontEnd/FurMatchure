import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatterns } from "./actions";

export default function Patterns(props) {
    console.log("props in patterns: ", props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatterns());
    }, []);
    const patterns = useSelector((state) => state.patterns);

    return (
        <div className="pattern_menu">
            {patterns &&
                patterns.map((pattern, i) => {
                    return (
                        <div className="item" key={i}>
                            <img
                                className="item_img"
                                src={pattern.path}
                                name={pattern.name}
                                id={pattern.id}
                                onClick={props.pickPattern}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
