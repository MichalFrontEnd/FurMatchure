import React, { useEffect, useState } from "react";
import { getLager } from "./actions";

import axios from "axios";

export default function Lager() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLager());
    }, []);
    const lager = useSelector((state) => state.lager);

    return (
        <div className="lager">
            {lager &&
                lager.map((item, i) => {
                    return (
                        <div
                            className="item"
                            key={i}
                            name={item.name}
                            id={item.id}
                        >
                            <img className="item_img" src={item.path} />
                        </div>
                    );
                })}
        </div>
    );
}
