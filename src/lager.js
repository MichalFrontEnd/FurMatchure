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
    //console.log("sofas: ", sofas);
    //console.log("lager: ", lager);
    function pickMenu(e) {
        //console.log("e.target.id: ", e.target.id);
        setMenuDis(e.target.id);
    }
    //console.log("menuDis: ", menuDis);
    return (
        <div className="furniture_menu">
            {/*<h3 className="menu_header" onClick={pickMenu} id="all">
                All
            </h3>*/}
            <ul onClick={pickMenu}>
                <li id="all">Show all |</li>
                <li id="sofas">Sofas |</li>
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
