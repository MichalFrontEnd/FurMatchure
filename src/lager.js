import React, { useEffect, useState } from "react";
import { getLager } from "./actions";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

export default function Lager(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLager());
    }, []);
    const lager = useSelector((state) => state.lager);

    return (
        <div className="furniture_menu">
            <h3 className="menu_header">Category</h3>
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
                                    onClick={props.getImage}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
