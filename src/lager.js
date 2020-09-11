import React, { useEffect, useState } from "react";
import { getLager } from "./actions";
import { useDispatch, useSelector } from "react-redux";

export default function Lager(props) {
    const dispatch = useDispatch();
    const [menuDis, setMenuDis] = useState("all");

    useEffect(() => {
        dispatch(getLager());
    }, []);
    const lager = useSelector((state) => state.lager);
    const sofas = useSelector(
        (state) =>
            state.lager &&
            state.lager.filter((category) => category.category == "sofas")
    );
    const couches = useSelector(
        (state) =>
            state.lager &&
            state.lager.filter((category) => category.category == "couches")
    );
    function pickMenu(e) {
        setMenuDis(e.target.id);
    }
    return (
        <div className="furniture_menu">
            <ul onClick={pickMenu}>
                <li id="all">Show all |</li>
                <li id="sofas"> Sofas |</li>
                <li id="couches"> Couches |</li>
            </ul>
            {menuDis == "all" && (
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
            )}
            {menuDis == "sofas" && (
                <div className="lager">
                    {sofas &&
                        sofas.map((item, i) => {
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
            )}
            {menuDis == "couches" && (
                <div className="lager">
                    {couches &&
                        couches.map((item, i) => {
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
            )}
        </div>
    );
}
